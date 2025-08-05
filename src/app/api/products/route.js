



// // src/app/api/products/route.js (Updated with Admin Protection)

// import { NextResponse } from 'next/server';
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { connectDB } from '@/utils/db';
// import Product from '@/models/Product';

// // Products fetch karna (sabke liye खुला hai)
// export async function GET() {
//   await connectDB();
//   try {
//     const products = await Product.find({}).sort({ createdAt: -1 });
//     return NextResponse.json(products);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
//   }
// }

// // Naya product add karna (Sirf Admin ke liye)
// export async function POST(request) {
//   // Session check karein
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ error: 'Access Denied: Admins only.' }, { status: 403 });
//   }

//   await connectDB();
//   try {
//     const body = await request.json();
//     const newProduct = new Product(body);
//     await newProduct.save();
//     return NextResponse.json(newProduct, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 400 });
//   }
// }












// // File Path: src/app/api/products/route.js

// import { NextResponse } from 'next/server';
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import connectDB from '@/lib/db'; // Yahan lib/db.js istemal karein
// import Product from '@/models/Product';

// // Naya product add karna (Sirf Admin ke liye)
// export async function POST(request) {
//   // Session check karein
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ success: false, error: 'Access Denied: You do not have permission to perform this action.' }, { status: 403 });
//   }

//   try {
//     await connectDB();
//     const body = await request.json();

//     // Check karein ke product ka naam mojood hai
//     if (!body.name || !body.price) {
//         return NextResponse.json({ success: false, error: 'Product name and price are required.' }, { status: 400 });
//     }

//     const newProduct = new Product(body);
//     const savedProduct = await newProduct.save();
    
//     // Consistent success response bhejein
//     return NextResponse.json({ success: true, data: savedProduct, message: "Product created successfully!" }, { status: 201 });
  
//   } catch (error) {
//     // Behtar error handling
//     if (error.code === 11000) { // Duplicate key error
//         return NextResponse.json({ success: false, error: `A product with this ${Object.keys(error.keyValue)[0]} already exists.` }, { status: 409 });
//     }
//     return NextResponse.json({ success: false, error: error.message || 'Failed to create product' }, { status: 400 });
//   }
// }











// File Path: src/app/api/products/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from '@/lib/db';
import Product from '@/models/Product';

// =======================================================
//   GET: Products for POS System
//   Yeh method POS page ke liye products fetch karega.
// =======================================================
export async function GET(request) {
  try {
    await connectDB();
    
    // Sirf woh products fetch karein jinka stock 0 se zyada hai.
    // Yeh POS system ko un-necessary products dikhane se rokega.
    const products = await Product.find({ stock: { $gt: 0 } })
      .select('name price stock') // Sirf zaroori data bhejein (performance ke liye)
      .sort({ name: 1 }); // Naam se sort karein

    // Consistent success response format istemal karein
    return NextResponse.json({ success: true, data: products });

  } catch (error) {
    console.error("API Error in GET /api/products:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}


// =======================================================
//   POST: Create a New Product
//   Yeh method naya product add karega (Sirf Admin ke liye).
//   Aapka pehle wala code bilkul theek tha, bas yahan integrate kar diya hai.
// =================================a======================
export async function POST(request) {
  // Session check karein (Security)
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Access Denied: You do not have permission to perform this action.' }, { status: 403 });
  }

  try {
    await connectDB();
    const body = await request.json();

    // Zaroori fields check karein
    if (!body.name || !body.price || body.cost === undefined) {
        return NextResponse.json({ success: false, error: 'Product name, price, and cost are required.' }, { status: 400 });
    }

    const newProduct = new Product(body);
    const savedProduct = await newProduct.save();
    
    // Consistent success response bhejein
    return NextResponse.json({ success: true, data: savedProduct, message: "Product created successfully!" }, { status: 201 });
  
  } catch (error) {
    console.error("API Error in POST /api/products:", error);
    // Duplicate key error (e.g., SKU pehle se mojood hai)
    if (error.code === 11000) {
        return NextResponse.json({ success: false, error: `A product with this ${Object.keys(error.keyValue)[0]} already exists.` }, { status: 409 });
    }
    // Validation errors
    return NextResponse.json({ success: false, error: error.message || 'Failed to create product' }, { status: 400 });
  }
}