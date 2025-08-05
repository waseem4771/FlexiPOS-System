


// src/app/api/dashboard/stats/route.js (Updated to count Users as Customers)

import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
// YAHAN BADLAV KIYA GAYA HAI: Customer ki jagah User model ko import karein
import User from '@/models/User'; 

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const today = new Date();
    const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));

    // Ab queries chalayein
    const [todaysOrders, totalProducts, totalUserCount] = await Promise.all([
      Order.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay },
        status: 'completed' 
      }),
      Product.countDocuments(),
      // YAHAN BADLAV KIYA GAYA HAI: Ab yeh Users ko count karega
      User.countDocuments() 
    ]);
    
    const todaysRevenue = todaysOrders.reduce((sum, order) => sum + (order.total || 0), 0);
    const todaysSales = todaysOrders.length;

    return NextResponse.json({
      success: true,
      data: {
        revenue: todaysRevenue,
        sales: todaysSales,
        products: totalProducts,
        // YAHAN BADLAV KIYA GAYA HAI: totalUserCount ko customers mein bhejein
        customers: totalUserCount,
      }
    });

  } catch (error) {
    console.error('API Error in /api/dashboard/stats:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal server error',
    }, { status: 500 });
  }
}