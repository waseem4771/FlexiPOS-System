// // File Path: src/app/api/reports/sales-summary/route.js

// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import connectDB from '@/lib/db';
// import Order from '@/models/Order';
// import Product from '@/models/Product';
// import mongoose from 'mongoose';

// export const dynamic = 'force-dynamic';

// export async function GET(request) {
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 });
//   }

//   try {
//     await connectDB();

//     // Date ranges define karein
//     const today = new Date();
//     const startOfToday = new Date(today.setHours(0, 0, 0, 0));
//     const endOfToday = new Date(today.setHours(23, 59, 59, 999));
    
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//     const startOfWeek = new Date(sevenDaysAgo.setHours(0, 0, 0, 0));

//     // Sabhi calculations ko ek sath chalayein
//     const [
//       dailySalesData,
//       weeklySalesData,
//       topSellingProducts,
//       lowStockItemsCount,
//       last7DaysSales
//     ] = await Promise.all([
//       // 1. Aaj ki Sales
//       Order.aggregate([
//         { $match: { status: 'completed', createdAt: { $gte: startOfToday, $lte: endOfToday } } },
//         { $group: { _id: null, total: { $sum: '$total' } } }
//       ]),
//       // 2. Is hafte ki Sales
//       Order.aggregate([
//         { $match: { status: 'completed', createdAt: { $gte: startOfWeek, $lte: endOfToday } } },
//         { $group: { _id: null, total: { $sum: '$total' } } }
//       ]),
//       // 3. Top Selling Product
//       Order.aggregate([
//         { $match: { status: 'completed' } },
//         { $unwind: '$items' },
//         { $group: { _id: '$items.product', totalQuantity: { $sum: '$items.quantity' } } },
//         { $sort: { totalQuantity: -1 } },
//         { $limit: 1 },
//         { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'productDetails' } },
//         { $unwind: '$productDetails' },
//         { $project: { name: '$productDetails.name' } }
//       ]),
//       // 4. Low Stock Items
//       Product.countDocuments({ $expr: { $lte: ['$stock', '$minStock'] } }),
//       // 5. Pichle 7 din ki sales (Chart ke liye)
//       Order.aggregate([
//         { $match: { status: 'completed', createdAt: { $gte: startOfWeek } } },
//         { $group: { 
//             _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, 
//             totalSales: { $sum: '$total' } 
//         }},
//         { $sort: { _id: 1 } },
//         { $project: { date: '$_id', sales: '$totalSales', _id: 0 } }
//       ])
//     ]);

//     return NextResponse.json({
//       success: true,
//       data: {
//         dailySales: dailySalesData[0]?.total || 0,
//         weeklySales: weeklySalesData[0]?.total || 0,
//         topSellingProduct: topSellingProducts[0]?.name || 'N/A',
//         lowStockItems: lowStockItemsCount,
//         chartData: last7DaysSales
//       }
//     });

//   } catch (error) {
//     console.error("API Error in /api/reports/sales-summary:", error);
//     return NextResponse.json({ success: false, error: 'Failed to fetch report data.' }, { status: 500 });
//   }
// }








// // File Path: src/app/api/reports/sales-summary/route.js

// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import connectDB from '@/lib/db';
// import Order from '@/models/Order';
// import Product from '@/models/Product';
// import mongoose from 'mongoose';

// export const dynamic = 'force-dynamic';

// export async function GET(request) {
//   const session = await getServerSession(authOptions);
  
//   // Security Check: User must be logged in.
//   if (!session) {
//     return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     await connectDB();

//     // Step 1: Get timeframe from URL, default to '7d'
//     const { searchParams } = new URL(request.url);
//     const timeframe = searchParams.get('timeframe') || '7d';

//     // Step 2: Calculate the start date based on the timeframe
//     let startDate = new Date();
//     switch (timeframe) {
//       case '1m': startDate.setMonth(startDate.getMonth() - 1); break;
//       case '6m': startDate.setMonth(startDate.getMonth() - 6); break;
//       case '1y': startDate.setFullYear(startDate.getFullYear() - 1); break;
//       case '7d':
//       default: startDate.setDate(startDate.getDate() - 7); break;
//     }
//     startDate.setHours(0, 0, 0, 0); // Set to the beginning of the day

//     // Step 3: Create the base query for filtering by role
//     const baseMatchQuery = {
//       status: 'completed',
//       createdAt: { $gte: startDate }
//     };

//     // If the user is a customer, add their ID to the query
//     if (session.user.role !== 'admin') {
//       baseMatchQuery.customer = new mongoose.Types.ObjectId(session.user.id);
//     }

//     // Step 4: Run all database aggregations in parallel for efficiency
//     const [
//       summaryData,
//       topProduct,
//       chartData
//     ] = await Promise.all([
//       // Aggregation for Total Sales/Spent and Order Count in the timeframe
//       Order.aggregate([
//         { $match: baseMatchQuery },
//         { $group: { 
//             _id: null, 
//             total: { $sum: '$total' }, 
//             count: { $sum: 1 } // Count the number of orders
//         }}
//       ]),

//       // Aggregation for the Top Product (store-wide for admin, personal for customer)
//       Order.aggregate([
//         { $match: baseMatchQuery },
//         { $unwind: '$items' },
//         { $group: { 
//             _id: '$items.product', 
//             totalQuantity: { $sum: '$items.quantity' } 
//         }},
//         { $sort: { totalQuantity: -1 } },
//         { $limit: 1 },
//         { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'productDetails' } },
//         { $unwind: '$productDetails' },
//         { $project: { name: '$productDetails.name', _id: 0 } }
//       ]),

//       // Aggregation for Chart Data (grouped by day)
//       Order.aggregate([
//         { $match: baseMatchQuery },
//         { $group: { 
//             _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, 
//             amount: { $sum: '$total' } 
//         }},
//         { $sort: { _id: 1 } },
//         { $project: { date: '$_id', sales: '$amount', _id: 0 } }
//       ])
//     ]);
    
//     // Step 5: Calculate low stock items count ONLY for admin
//     let lowStockItems = 0;
//     if (session.user.role === 'admin') {
//       lowStockItems = await Product.countDocuments({ $expr: { $lte: ['$stock', '$minStock'] } });
//     }

//     // Step 6: Format and return the final response
//     return NextResponse.json({
//       success: true,
//       data: {
//         totalSalesOrSpent: summaryData[0]?.total || 0,
//         totalOrders: summaryData[0]?.count || 0,
//         topProduct: topProduct[0]?.name || 'N/A',
//         lowStockItems: lowStockItems, // This will be 0 for customers
//         chartData: chartData
//       }
//     });

//   } catch (error) {
//     console.error("API Error in /api/reports/sales-summary:", error);
//     return NextResponse.json({ success: false, error: 'Failed to fetch report data.' }, { status: 500 });
//   }
// }











// File Path: src/app/api/reports/sales-summary/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db'; // Assuming this is your DB connection helper
import Order from '@/models/Order';
import Product from '@/models/Product';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '7d';

    let startDate = new Date();
    switch (timeframe) {
      case '1m': startDate.setMonth(startDate.getMonth() - 1); break;
      case '6m': startDate.setMonth(startDate.getMonth() - 6); break;
      case '1y': startDate.setFullYear(startDate.getFullYear() - 1); break;
      case '7d':
      default: startDate.setDate(startDate.getDate() - 7); break;
    }
    startDate.setHours(0, 0, 0, 0);

    const baseMatchQuery = {
      // status: 'completed', // You can add status if you only want to count completed orders
      createdAt: { $gte: startDate }
    };

    if (session.user.role !== 'admin') {
      baseMatchQuery.customer = new mongoose.Types.ObjectId(session.user.id);
    }

    // === BADLAAV YAHAN HAI: Ab hum 4 aggregations parallel mein chalayenge ===
    const [
      summaryData,
      topProduct,
      chartData,
      profitData // Yeh naya hai
    ] = await Promise.all([
      // Aggregation 1: Total Sales and Order Count (No change)
      Order.aggregate([
        { $match: baseMatchQuery },
        { $group: { 
            _id: null, 
            total: { $sum: '$total' }, 
            count: { $sum: 1 }
        }}
      ]),

      // Aggregation 2: Top Product (No change)
      Order.aggregate([
        { $match: baseMatchQuery },
        { $unwind: '$items' },
        { $group: { 
            _id: '$items.product', 
            totalQuantity: { $sum: '$items.quantity' } 
        }},
        { $sort: { totalQuantity: -1 } },
        { $limit: 1 },
        { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'productDetails' } },
        { $unwind: '$productDetails' },
        { $project: { name: '$productDetails.name', _id: 0 } }
      ]),

      // Aggregation 3: Chart Data (No change)
      Order.aggregate([
        { $match: baseMatchQuery },
        { $group: { 
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, 
            amount: { $sum: '$total' } 
        }},
        { $sort: { _id: 1 } },
        { $project: { date: '$_id', sales: '$amount', _id: 0 } }
      ]),

      // === NAYI AGGREGATION (4): Total Cost of Goods ===
      Order.aggregate([
        { $match: baseMatchQuery },
        { $unwind: '$items' },
        { $lookup: { // Product collection se 'cost' laane ke liye
            from: 'products',
            localField: 'items.product',
            foreignField: '_id',
            as: 'productInfo'
        }},
        { $unwind: '$productInfo' },
        { $group: {
            _id: null,
            // Total cost = sum of (quantity * cost) for each item
            totalCost: { $sum: { $multiply: ['$items.quantity', '$productInfo.cost'] } }
        }}
      ])
    ]);
    
    // Low stock items (Only for admin)
    let lowStockItems = 0;
    if (session.user.role === 'admin') {
      lowStockItems = await Product.countDocuments({ $expr: { $lte: ['$stock', '$minStock'] } });
    }

    // === BADLAAV YAHAN HAI: Final data ko assemble karna ===
    const totalSales = summaryData[0]?.total || 0;
    const totalCost = profitData[0]?.totalCost || 0; // Naye aggregation se value
    const grossProfit = totalSales - totalCost; // Profit calculate karna

    return NextResponse.json({
      success: true,
      data: {
        totalSalesOrSpent: totalSales,
        totalOrders: summaryData[0]?.count || 0,
        topProduct: topProduct[0]?.name || 'N/A',
        lowStockItems: lowStockItems,
        chartData: chartData,
        // Naye fields jo frontend ko chahiye
        totalCost: totalCost,
        grossProfit: grossProfit
      }
    });

  } catch (error) {
    console.error("API Error in /api/reports/sales-summary:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch report data.' }, { status: 500 });
  }
}