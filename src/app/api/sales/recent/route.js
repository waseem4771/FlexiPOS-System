// import { NextResponse } from 'next/server';
// import { connectDB } from '@/utils/db';
// import Order from '@/models/Order';

// export async function GET(request) {
//   try {
//     // Database se connect karein
//     await connectDB();

//     // Recent 5 sales fetch karein
//     const recentSales = await Order.find({})
//       .sort({ createdAt: -1 }) // Sabse naye order pehle
//       .limit(5) // Sirf 5 results
//       .populate('customer', 'name'); // Customer ka naam bhi fetch karein
    
//     // Data ko frontend ke liye format karein
//     const formattedSales = recentSales.map(sale => ({
//       id: sale._id.toString(),
//       customer: sale.customer?.name || 'Walk-in Customer',
//       amount: `$${sale.total.toFixed(2)}`,
//       status: sale.status
//     }));

//     // Sahi response (200 OK) ke saath data bhejein
//     return NextResponse.json(formattedSales, { status: 200 });

//   } catch (error) {
//     // Agar koi error aata hai
//     console.error('Recent sales fetch error:', error);
//     // Error response (500 Internal Server Error) bhejein
//     return NextResponse.json(
//       { error: 'Failed to fetch recent sales' },
//       { status: 500 }
//     );
//   }
// }










// File Path: src/app/api/sales/recent/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect'; // 1. Sahi DB connection file istemal karein
import Order from '@/models/Order';
import User from '@/models/User'; // 2. User model ko import karna zaroori hai populate ke liye

export const dynamic = 'force-dynamic'; // 3. Route ko dynamic mark karein

export async function GET(request) {
  try {
    // Database se connect karein
    await connectDB();

    // Recent 5 sales fetch karein
    const recentSales = await Order.find({})
      .sort({ createdAt: -1 }) // Sabse naye order pehle
      .limit(5) // Sirf 5 results
      .populate({
        path: 'customer',     // 'customer' field ko populate karna hai
        model: User,          // 'User' model se data lena hai
        select: 'name'        // Sirf 'name' field select karni hai
      });
    
    // Data ko frontend ke liye format karein
    const formattedSales = recentSales.map(sale => ({
      id: sale._id.toString(),
      customer: sale.customer?.name || 'Walk-in Customer', // Agar customer null ho to fallback
      amount: `$${sale.total.toFixed(2)}`,
      status: sale.status
    }));

    // Sahi response (200 OK) ke saath data bhejein
    return NextResponse.json(formattedSales, { status: 200 });

  } catch (error) {
    // Agar koi error aata hai
    console.error('API Error in /api/sales/recent:', error);
    // Error response (500 Internal Server Error) bhejein
    return NextResponse.json(
      { error: 'Failed to fetch recent sales. ' + error.message },
      { status: 500 }
    );
  }
}