// File Path: src/app/api/payments/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/dbConnect';
import Order from '@/models/Order';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  // Pehle check karein ke user login hai ya nahi
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '15', 10);
    const skip = (page - 1) * limit;

    // Query object banayein
    const query = {
      status: 'completed' // Sirf completed orders hi payments hain
    };

    // Role ke hisab se query ko modify karein
    if (session.user.role !== 'admin') {
      // Agar user admin nahi hai, to sirf uski apni payments dikhayein
      query.customer = session.user.id;
    }

    // Database se data fetch karein (query ke sath)
    const payments = await Order.find(query)
      .populate({ path: 'customer', model: User, select: 'name' })
      .select('total paymentMethod createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Kul documents bhi query ke sath count karein
    const totalPayments = await Order.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: payments,
      pagination: {
        total: totalPayments,
        page,
        limit,
        totalPages: Math.ceil(totalPayments / limit),
      },
    });

  } catch (error) {
    console.error('API Error in /api/payments:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch payment history.' }, { status: 500 });
  }
}