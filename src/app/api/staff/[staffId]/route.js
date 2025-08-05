// // File Path: src/app/api/staff/[staffId]/route.js

// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import connectDB from '@/lib/db';
// import User from '@/models/User';

// // PUT: Update a staff member's details (Admin Only)
// export async function PUT(request, { params }) {
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 });
//   }

//   try {
//     await connectDB();
//     const { staffId } = params;
//     const { name, role } = await request.json(); // Sirf naam aur role update karne ki ijazat dein

//     if (!name || !role) {
//       return NextResponse.json({ success: false, error: 'Name and role are required.' }, { status: 400 });
//     }

//     const updatedStaff = await User.findByIdAndUpdate(staffId, { name, role }, { new: true, runValidators: true }).select('-password');
//     if (!updatedStaff) return NextResponse.json({ success: false, error: 'Staff member not found' }, { status: 404 });
    
//     return NextResponse.json({ success: true, data: updatedStaff });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }

// // DELETE: Delete a staff member (Admin Only)
// export async function DELETE(request, { params }) {
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 });
//   }

//   try {
//     await connectDB();
//     const { staffId } = params;
//     const deletedStaff = await User.findByIdAndDelete(staffId);
//     if (!deletedStaff) return NextResponse.json({ success: false, error: 'Staff member not found' }, { status: 404 });
//     return NextResponse.json({ success: true, message: 'Staff member deleted successfully' });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: 'Failed to delete staff member.' }, { status: 500 });
//   }
// }











// File Path: src/app/api/staff/[staffId]/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/dbConnect';
import User from '@/models/User';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

// =======================================================
//   GET: Fetch a Single Staff Member (Admin Only)
//   Yeh method "Edit Page" ke liye zaroori hai.
// =======================================================
export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 });
  }

  try {
    await connectDB();
    const { staffId } = params;

    if (!mongoose.Types.ObjectId.isValid(staffId)) {
      return NextResponse.json({ success: false, error: 'Invalid Staff ID' }, { status: 400 });
    }

    const staff = await User.findById(staffId).select('name email role'); // Sirf zaroori data bhejein
    if (!staff) {
      return NextResponse.json({ success: false, error: 'Staff member not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: staff });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch staff member.' }, { status: 500 });
  }
}

// PUT: Update a staff member's details (Admin Only)
export async function PUT(request, { params }) {
    // ... aapka PUT code yahan waisa hi rahega ...
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') { return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 }); }
    try {
        await connectDB();
        const { staffId } = params;
        const { name, role } = await request.json();
        if (!name || !role) { return NextResponse.json({ success: false, error: 'Name and role are required.' }, { status: 400 }); }
        const updatedStaff = await User.findByIdAndUpdate(staffId, { name, role }, { new: true, runValidators: true }).select('-password');
        if (!updatedStaff) return NextResponse.json({ success: false, error: 'Staff member not found' }, { status: 404 });
        return NextResponse.json({ success: true, data: updatedStaff });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// DELETE: Delete a staff member (Admin Only)
export async function DELETE(request, { params }) {
    // ... aapka DELETE code yahan waisa hi rahega ...
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') { return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 }); }
    try {
        await connectDB();
        const { staffId } = params;
        const deletedStaff = await User.findByIdAndDelete(staffId);
        if (!deletedStaff) return NextResponse.json({ success: false, error: 'Staff member not found' }, { status: 404 });
        return NextResponse.json({ success: true, message: 'Staff member deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete staff member.' }, { status: 500 });
    }
}