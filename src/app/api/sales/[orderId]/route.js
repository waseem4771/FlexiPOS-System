// File Path: src/app/api/sales/[orderId]/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/dbConnect';
import Order from '@/models/Order';
import User from '@/models/User';
import Product from '@/models/Product'; // Product model import karain
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { orderId } = params;

    // Check karein ke orderId valid hai ya nahi
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json({ success: false, error: 'Invalid Order ID' }, { status: 400 });
    }

    await connectDB();

    const order = await Order.findById(orderId)
      .populate({
        path: 'customer',
        model: User,
        select: 'name email' // Customer ki details
      })
      .populate({
        path: 'items.product',
        model: Product,
        select: 'name price' // Har item ke andar product ki details
      });

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    // SECURITY CHECK: Admin har order dekh sakta hai, customer sirf apna
    if (session.user.role !== 'admin' && order.customer?._id.toString() !== session.user.id) {
      return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: order });

  } catch (error) {
    console.error(`API Error in /api/sales/${params.orderId}:`, error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal server error',
    }, { status: 500 });
  }
}