// // File Path: src/app/api/inventory/route.js

// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/db';
// import Product from '@/models/Product';
// import Category from '@/models/Category'; // Category model ko import karein populate ke liye

// export const dynamic = 'force-dynamic';

// export async function GET(request) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get('page') || '1', 10);
//     const limit = parseInt(searchParams.get('limit') || '10', 10);
//     const skip = (page - 1) * limit;

//     // Database se products fetch karein
//     const products = await Product.find({})
//       .populate({
//         path: 'category',
//         model: Category,
//         select: 'name' // Sirf category ka naam select karein
//       })
//       .select('name sku stock minStock price') // Sirf zaroori fields select karein
//       .sort({ name: 1 }) // Products ko naam se sort karein
//       .skip(skip)
//       .limit(limit);

//     // Kul products ki tadaad hasil karein pagination ke liye
//     const totalProducts = await Product.countDocuments();

//     return NextResponse.json({
//       success: true,
//       data: products,
//       pagination: {
//         total: totalProducts,
//         page,
//         limit,
//         totalPages: Math.ceil(totalProducts / limit),
//       },
//     });

//   } catch (error) {
//     console.error('API Error in /api/inventory:', error);
//     return NextResponse.json({
//       success: false,
//       error: 'Failed to fetch inventory data. ' + error.message,
//     }, { status: 500 });
//   }
// }









// File Path: src/app/api/inventory/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import Product from '@/models/Product';
// import Category from '@/models/Category'; // <--- YEH LINE HATA DI GAYI HAI taake "Module not found" ka error na aaye

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // Database se products fetch karein
    const products = await Product.find({})
      // .populate({            // <--- YEH POORA .populate() BLOCK BHI AARZI TOR PAR HATA DIYA GAYA HAI
      //   path: 'category',
      //   model: Category,
      //   select: 'name' 
      // })
      .select('name sku stock minStock price category') // `category` ID ko phir bhi select kar rahe hain, agar future mein zaroorat pare
      .sort({ name: 1 }) // Products ko naam se sort karein
      .skip(skip)
      .limit(limit);

    // Kul products ki tadaad hasil karein pagination ke liye
    const totalProducts = await Product.countDocuments();

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total: totalProducts,
        page,
        limit,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });

  } catch (error) {
    console.error('API Error in /api/inventory:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch inventory data. ' + error.message,
    }, { status: 500 });
  }
}