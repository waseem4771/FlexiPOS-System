// File Path: src/app/api/customers/[customerId]/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import User from '@/models/User';
import Order from '@/models/Order';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  // Security Check: Sirf Admin hi yeh data dekh sakta hai
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 });
  }

  try {
    const { customerId } = params;
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return NextResponse.json({ success: false, error: 'Invalid Customer ID' }, { status: 400 });
    }

    await connectDB();

    // Ek hi waqt mein customer ki details aur orders fetch karein
    const [customer, orders] = await Promise.all([
      User.findById(customerId).select('name email role createdAt'),
      Order.find({ customer: customerId }).sort({ createdAt: -1 }).limit(20) // Latest 20 orders
    ]);

    if (!customer) {
      return NextResponse.json({ success: false, error: 'Customer not found' }, { status: 404 });
    }

    // Customer ke total kharchay (total spent) calculate karein
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

    return NextResponse.json({
      success: true,
      data: {
        customer,
        purchaseHistory: orders,
        stats: {
          totalOrders: orders.length,
          totalSpent: totalSpent,
        },
      },
    });

  } catch (error) {
    console.error(`API Error in /api/customers/${params.customerId}:`, error);
    return NextResponse.json({ success: false, error: 'Failed to fetch customer details.' }, { status: 500 });
  }
}