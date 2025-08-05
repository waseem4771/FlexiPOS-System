// // File Path: src/app/api/suppliers/[supplierId]/route.js

// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import connectDB from '@/lib/db';
// import Supplier from '@/models/Supplier';
// import mongoose from 'mongoose';

// // GET: Fetch a single supplier
// export async function GET(request, { params }) {
//   // ... (Admin check)
//   const { supplierId } = params;
//   // ... (find by ID logic)
// }

// // PUT: Update a supplier
// export async function PUT(request, { params }) {
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 });
//   }

//   try {
//     await connectDB();
//     const { supplierId } = params;
//     const body = await request.json();
//     const updatedSupplier = await Supplier.findByIdAndUpdate(supplierId, body, { new: true, runValidators: true });
//     if (!updatedSupplier) return NextResponse.json({ success: false, error: 'Supplier not found' }, { status: 404 });
//     return NextResponse.json({ success: true, data: updatedSupplier });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }

// // DELETE: Delete a supplier
// export async function DELETE(request, { params }) {
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 });
//   }

//   try {
//     await connectDB();
//     const { supplierId } = params;
//     const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);
//     if (!deletedSupplier) return NextResponse.json({ success: false, error: 'Supplier not found' }, { status: 404 });
//     return NextResponse.json({ success: true, message: 'Supplier deleted successfully' });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: 'Failed to delete supplier.' }, { status: 500 });
//   }
// }








// File Path: src/app/api/suppliers/[supplierId]/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import Supplier from '@/models/Supplier';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

// =======================================================
//   GET: Fetch a Single Supplier by ID (Admin Only)
//   Yeh method ab mukammal hai.
// =======================================================
export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 });
  }

  try {
    await connectDB();
    const { supplierId } = params;

    if (!mongoose.Types.ObjectId.isValid(supplierId)) {
      return NextResponse.json({ success: false, error: 'Invalid Supplier ID' }, { status: 400 });
    }

    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return NextResponse.json({ success: false, error: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: supplier });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch supplier.' }, { status: 500 });
  }
}


// =======================================================
//   PUT: Update a Supplier (Admin Only)
//   Yeh pehle se theek tha.
// =======================================================
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 });
  }

  try {
    await connectDB();
    const { supplierId } = params;
    const body = await request.json();
    const updatedSupplier = await Supplier.findByIdAndUpdate(supplierId, body, { new: true, runValidators: true });
    if (!updatedSupplier) return NextResponse.json({ success: false, error: 'Supplier not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: updatedSupplier });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}


// =======================================================
//   DELETE: Delete a Supplier (Admin Only)
//   Yeh bhi pehle se theek tha.
// =======================================================
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 });
  }

  try {
    await connectDB();
    const { supplierId } = params;
    const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);
    if (!deletedSupplier) return NextResponse.json({ success: false, error: 'Supplier not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Supplier deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete supplier.' }, { status: 500 });
  }
}