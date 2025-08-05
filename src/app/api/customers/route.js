// File Path: src/app/api/customers/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  // Step 1: Check if the user is logged in. If not, deny access.
  if (!session || !session.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized: You must be logged in to view customers.' }, { status: 401 });
  }

  try {
    await connectDB();

    // Step 2: Fetch all users who are NOT admins.
    // Also, exclude the currently logged-in user from the list.
    // This logic now works for BOTH Admins and Customers.
    const customers = await User.find({ 
        role: { $ne: 'admin' },       // Admins ko list se nikaal dein
        _id: { $ne: session.user.id } // Jo user dekh raha hai, usko bhi list se nikaal dein
      })
      .select('name email role createdAt') // Send only necessary, non-sensitive data
      .sort({ createdAt: -1 });           // Show newest customers first

    // Step 3: Return the list of customers.
    // If a Customer is viewing, they will see other customers.
    // If an Admin is viewing, they will also see other customers.
    return NextResponse.json({ success: true, data: customers });

  } catch (error) {
    console.error('API Error in /api/customers:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch customers.' }, { status: 500 });
  }
}