// // src/app/api/products/[id]/route.js (Updated with Admin Protection)

// import { NextResponse } from 'next/server';
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // authOptions ko import karein
// import { connectDB } from '@/utils/db'; // Sahi path istemal karein
// import Product from '@/models/Product';

// // Single product fetch karne ke liye GET (Yeh sabke liye खुला hai)
// export async function GET(request, { params }) {
//   await connectDB();
//   try {
//     const product = await Product.findById(params.id);
//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }
//     return NextResponse.json(product);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
//   }
// }

// // Product update karne ke liye PUT (Sirf Admin ke liye)
// export async function PUT(request, { params }) {
//   // Session check karein
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ error: 'Access Denied: Admins only.' }, { status: 403 });
//   }

//   await connectDB();
//   try {
//     const body = await request.json();
//     const updatedProduct = await Product.findByIdAndUpdate(params.id, body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!updatedProduct) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }
//     return NextResponse.json(updatedProduct);
//   } catch (error) {
//     return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 400 });
//   }
// }

// // Product delete karne ke liye DELETE (Sirf Admin ke liye)
// export async function DELETE(request, { params }) {
//   // Session check karein
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ error: 'Access Denied: Admins only.' }, { status: 403 });
//   }
  
//   await connectDB();
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(params.id);
//     if (!deletedProduct) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }
//     return NextResponse.json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
//   }
// }










// File Path: src/app/api/products/[id]/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from '@/lib/db'; // Yahan lib/db.js istemal karein
import Product from '@/models/Product';
import mongoose from 'mongoose';

// Single product fetch karne ke liye GET (sabke liye खुला hai)
export async function GET(request, { params }) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
        return NextResponse.json({ success: false, error: 'Invalid Product ID' }, { status: 400 });
    }

    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch product' }, { status: 500 });
  }
}

// Product update karne ke liye PUT (Sirf Admin ke liye)
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Access Denied.' }, { status: 403 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const updatedProduct = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedProduct, message: "Product updated successfully!" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// Product delete karne ke liye DELETE (Sirf Admin ke liye)
export async function DELETE(request, { params }) {
    // Delete logic yahan add karein, aapka pehle wala code theek tha
}