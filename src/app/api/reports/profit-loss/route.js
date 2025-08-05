// // src/app/api/reports/profit-loss/route.js

// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Order from '@/models/Order';
// import mongoose from 'mongoose';

// export async function GET(request) {
//   await dbConnect();

//   try {
//     const { searchParams } = new URL(request.url);
//     const startDate = searchParams.get('startDate');
//     const endDate = searchParams.get('endDate');

//     if (!startDate || !endDate) {
//       return NextResponse.json({ success: false, error: 'Please provide both startDate and endDate.' }, { status: 400 });
//     }

//     // MongoDB Aggregation Pipeline - Yahi asli magic hai
//     const report = await Order.aggregate([
//       // Step 1: Sirf uss date range ke orders ko filter karo
//       {
//         $match: {
//           createdAt: {
//             $gte: new Date(startDate),
//             $lte: new Date(endDate),
//           },
//         },
//       },
//       // Step 2: Order ke items array ko alag-alag documents mein todo
//       { $unwind: '$items' },
      
//       // Step 3: Har item ke liye Product collection se 'costPrice' laao
//       {
//         $lookup: {
//           from: 'products', // 'products' collection ka naam
//           localField: 'items.product', // Order ke item ka product ID
//           foreignField: '_id', // Product collection ka _id
//           as: 'productDetails', // Naye field ka naam
//         },
//       },
      
//       // Step 4: Agar product mil jaaye, to usko use karo
//       {
//         $match: { 'productDetails': { $ne: [] } }
//       },

//       // Step 5: Har item ke liye total revenue aur total cost calculate karo
//       {
//         $project: {
//           _id: 0,
//           itemRevenue: { $multiply: ['$items.quantity', '$items.price'] },
//           itemCost: { $multiply: ['$items.quantity', { $arrayElemAt: ['$productDetails.costPrice', 0] }] },
//           orderTotal: '$total', // Hum original order total bhi le sakte hain
//           orderTax: '$tax',
//           orderSubtotal: '$subtotal'
//         },
//       },

//       // Step 6: Sabhi items ka final total karo
//       {
//         $group: {
//           _id: null,
//           totalRevenue: { $sum: '$itemRevenue' },
//           totalCost: { $sum: '$itemCost' },
//         },
//       },
      
//       // Step 7: Final profit calculate karo
//       {
//         $project: {
//           _id: 0,
//           totalRevenue: '$totalRevenue',
//           totalCost: '$totalCost',
//           grossProfit: { $subtract: ['$totalRevenue', '$totalCost'] },
//         }
//       }
//     ]);
    
//     // Agar uss date range mein koi order nahi hai, to report khali aayegi
//     const result = report.length > 0 ? report[0] : { totalRevenue: 0, totalCost: 0, grossProfit: 0 };

//     return NextResponse.json({ success: true, data: result });

//   } catch (error) {
//     console.error('Profit/Loss Report Error:', error);
//     return NextResponse.json({ success: false, error: 'Server error while generating report.' }, { status: 500 });
//   }
// }














// src/app/api/reports/profit-loss/route.js

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import mongoose from 'mongoose';

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
      return NextResponse.json({ success: false, error: 'Please provide both startDate and endDate.' }, { status: 400 });
    }

    // MongoDB Aggregation Pipeline
    const report = await Order.aggregate([
      // Step 1: Sirf uss date range ke orders ko filter karo
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      // Step 2: Order ke items array ko alag-alag documents mein todo
      { $unwind: '$items' },
      
      // Step 3: Har item ke liye Product collection se 'cost' laao
      {
        $lookup: {
          from: 'products', // 'products' collection ka naam
          localField: 'items.product', // Order ke item ka product ID
          foreignField: '_id', // Product collection ka _id
          as: 'productDetails',
        },
      },
      
      // Step 4: Agar product mil jaaye, to usko use karo
      {
        $match: { 'productDetails': { $ne: [] } }
      },

      // Step 5: Har item ke liye total revenue aur total cost calculate karo
      {
        $project: {
          _id: 0,
          itemRevenue: { $multiply: ['$items.quantity', '$items.price'] },
          // !!! BADLAAV YAHAN HAI: Humne 'cost' field ka istemal kiya hai !!!
          itemCost: { $multiply: ['$items.quantity', { $arrayElemAt: ['$productDetails.cost', 0] }] },
        },
      },

      // Step 6: Sabhi items ka final total karo
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$itemRevenue' },
          totalCost: { $sum: '$itemCost' },
        },
      },
      
      // Step 7: Final profit calculate karo
      {
        $project: {
          _id: 0,
          totalRevenue: '$totalRevenue',
          totalCost: '$totalCost',
          grossProfit: { $subtract: ['$totalRevenue', '$totalCost'] },
        }
      }
    ]);
    
    const result = report.length > 0 ? report[0] : { totalRevenue: 0, totalCost: 0, grossProfit: 0 };

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error('Profit/Loss Report Error:', error);
    return NextResponse.json({ success: false, error: 'Server error while generating report.' }, { status: 500 });
  }
}