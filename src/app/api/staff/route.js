// // File Path: src/app/api/staff/route.js

// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import connectDB from '@/lib/db';
// import User from '@/models/User';
// import bcrypt from 'bcryptjs';

// export const dynamic = 'force-dynamic';

// // GET: Fetch all staff members (Admin Only)
// export async function GET(request) {
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 });
//   }

//   try {
//     await connectDB();
//     // Un tamam users ko find karein jinka role 'admin' ya 'customer' nahi hai
//     const staff = await User.find({ role: { $nin: ['admin', 'customer'] } })
//       .select('name email role createdAt') // Password kabhi na bhejein
//       .sort({ createdAt: -1 });

//     return NextResponse.json({ success: true, data: staff });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: 'Failed to fetch staff members.' }, { status: 500 });
//   }
// }

// // POST: Create a new staff member (Admin Only)
// export async function POST(request) {
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ success: false, error: 'Access Denied' }, { status: 403 });
//   }

//   try {
//     await connectDB();
//     const { name, email, password, role } = await request.json();

//     if (!name || !email || !password || !role) {
//       return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
//     }
    
//     // Check karein ke role valid hai
//     if (['admin', 'customer'].includes(role)) {
//         return NextResponse.json({ success: false, error: 'Invalid staff role.' }, { status: 400 });
//     }

//     // Password ko hash karein
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newStaff = new User({ name, email, password: hashedPassword, role });
//     await newStaff.save();

//     // Response mein password na bhejein
//     const staffResponse = newStaff.toObject();
//     delete staffResponse.password;

//     return NextResponse.json({ success: true, data: staffResponse }, { status: 201 });
//   } catch (error) {
//     if (error.code === 11000) {
//       return NextResponse.json({ success: false, error: 'A user with this email already exists.' }, { status: 409 });
//     }
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }









// // File Path: src/app/api/staff/route.js

// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import connectDB from '@/lib/db';
// import User from '@/models/User';
// import bcrypt from 'bcryptjs';

// export const dynamic = 'force-dynamic';

// // =======================================================
// //   GET: Fetch All Staff Members
// //   Yeh method ab har logged-in user ko data dega.
// // =======================================================
// export async function GET(request) {
//   const session = await getServerSession(authOptions);
  
//   // Security Check: Sirf yeh check karein ke user login hai ya nahi.
//   if (!session) {
//     return NextResponse.json({ success: false, error: 'Unauthorized: You must be logged in.' }, { status: 401 });
//   }

//   try {
//     await connectDB();
//     // Role check yahan se hata diya gaya hai.
//     // Un tamam users ko find karein jinka role 'admin' ya 'customer' nahi hai.
//     const staff = await User.find({ role: { $nin: ['admin', 'customer'] } })
//       .select('name email role createdAt') // Password kabhi na bhejein
//       .sort({ createdAt: -1 });

//     return NextResponse.json({ success: true, data: staff });
//   } catch (error) {
//     console.error("API Error in GET /api/staff:", error);
//     return NextResponse.json({ success: false, error: 'Failed to fetch staff members.' }, { status: 500 });
//   }
// }

// // =======================================================
// //   POST: Create a New Staff Member
// //   Yeh method abhi bhi sirf Admin ke liye hai.
// // =======================================================
// export async function POST(request) {
//   const session = await getServerSession(authOptions);

//   // Security Check: Naya staff sirf Admin hi add kar sakta hai.
//   if (!session || session.user.role !== 'admin') {
//     return NextResponse.json({ success: false, error: 'Access Denied: Only admins can create staff.' }, { status: 403 });
//   }

//   try {
//     await connectDB();
//     const { name, email, password, role } = await request.json();

//     if (!name || !email || !password || !role) {
//       return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
//     }
    
//     if (['admin', 'customer'].includes(role)) {
//         return NextResponse.json({ success: false, error: 'Invalid staff role. Valid roles are cashier, manager, etc.' }, { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newStaff = new User({ name, email, password: hashedPassword, role });
//     await newStaff.save();
    
//     const staffResponse = newStaff.toObject();
//     delete staffResponse.password;

//     return NextResponse.json({ success: true, data: staffResponse, message: 'Staff member created successfully!' }, { status: 201 });
//   } catch (error) {
//     console.error("API Error in POST /api/staff:", error);
//     if (error.code === 11000) {
//       return NextResponse.json({ success: false, error: 'A user with this email already exists.' }, { status: 409 });
//     }
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }













// File Path: src/app/api/staff/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

// =======================================================
//   GET: Fetch All Staff Members
//   (Yeh pehle se theek tha, ismein koi tabdeeli nahi)
// =======================================================
export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized: You must be logged in.' }, { status: 401 });
  }

  try {
    await connectDB();
    const staff = await User.find({ role: { $nin: ['admin', 'customer'] } })
      .select('name email role createdAt')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: staff });
  } catch (error) {
    console.error("API Error in GET /api/staff:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch staff members.' }, { status: 500 });
  }
}

// =======================================================
//   POST: Create a New Staff Member or Admin
//   (Ismein zaroori tabdeeli kar di gayi hai)
// =======================================================
export async function POST(request) {
  const session = await getServerSession(authOptions);

  // Security Check: Sirf Admin hi naye users bana sakta hai.
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Access Denied: Only admins can create users.' }, { status: 403 });
  }

  try {
    await connectDB();
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
    }
    
    // YEH AHEM TABDEELI HAI: Ab yeh sirf 'customer' role ko rokega.
    // Admin ab naye admins bhi bana sakta hai.
    if (role === 'customer') {
        return NextResponse.json({ success: false, error: 'Invalid role. You cannot create a "customer" from the staff management page.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return NextResponse.json({ success: true, data: userResponse, message: 'User created successfully!' }, { status: 201 });
  } catch (error) {
    console.error("API Error in POST /api/staff:", error);
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'A user with this email already exists.' }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}