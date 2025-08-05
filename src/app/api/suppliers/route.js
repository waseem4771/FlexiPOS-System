// File Path: src/app/api/suppliers/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import Supplier from '@/models/Supplier';

export const dynamic = 'force-dynamic';


// =======================================================
//   GET: Fetch All Suppliers
//   Yeh method ab har logged-in user ko data dega.
// =======================================================
export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  // Security Check: Sirf yeh check karein ke user login hai ya nahi.
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized: You must be logged in.' }, { status: 401 });
  }

  try {
    await connectDB();
    // Role check yahan se hata diya gaya hai.
    const suppliers = await Supplier.find({}).sort({ name: 1 });
    return NextResponse.json({ success: true, data: suppliers });

  } catch (error) {
    console.error("API Error in GET /api/suppliers:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch suppliers.' }, { status: 500 });
  }
}


// =======================================================
//   POST: Create a New Supplier
//   Yeh method abhi bhi sirf Admin ke liye hai.
// =======================================================
export async function POST(request) {
  const session = await getServerSession(authOptions);

  // Security Check: Naya supplier sirf Admin hi add kar sakta hai.
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Access Denied: Only admins can create suppliers.' }, { status: 403 });
  }

  try {
    await connectDB();
    const body = await request.json();

    // Zaroori fields check karein
    if (!body.name || !body.email) {
      return NextResponse.json({ success: false, error: 'Supplier name and email are required.' }, { status: 400 });
    }

    const newSupplier = new Supplier(body);
    const savedSupplier = await newSupplier.save();
    return NextResponse.json({ success: true, data: savedSupplier }, { status: 201 });

  } catch (error) {
    console.error("API Error in POST /api/suppliers:", error);
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: `A supplier with this ${Object.keys(error.keyValue)[0]} already exists.` }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}