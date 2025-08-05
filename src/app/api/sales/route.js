// // File Path: src/app/api/sales/route.js

// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/db'; // Yahan lib/db.js istemal karain
// import Order from '@/models/Order';
// import User from '@/models/User'; // User model ko import karain 'populate' ke liye

// export const dynamic = 'force-dynamic';

// export async function GET(request) {
//   try {
//     await connectDB();

//     // URL se page aur limit hasil karain (pagination ke liye)
//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get('page') || '1', 10);
//     const limit = parseInt(searchParams.get('limit') || '10', 10);
//     const skip = (page - 1) * limit;

//     // Database se orders fetch karain
//     // .populate() customerId ko user ke name se replace kar dega
//     // .sort() se naye orders sab se upar aayenge
//     const orders = await Order.find({})
//       .populate({
//         path: 'customer',
//         model: User,
//         select: 'name email' // Sirf customer ka naam aur email select karein
//       })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     // Kul orders ki tadaad hasil karain pagination ke liye
//     const totalOrders = await Order.countDocuments();

//     return NextResponse.json({
//       success: true,
//       data: orders,
//       pagination: {
//         total: totalOrders,
//         page,
//         limit,
//         totalPages: Math.ceil(totalOrders / limit),
//       },
//     });

//   } catch (error) {
//     console.error('API Error in /api/sales:', error);
//     return NextResponse.json({
//       success: false,
//       error: error.message || 'Internal server error',
//     }, { status: 500 });
//   }
// }







// File Path: src/app/api/sales/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Ensure this path is correct
import connectDB from '@/lib/dbConnect';
import Order from '@/models/Order';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // 1. Get user session securely on the server
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized: You must be logged in.' }, { status: 401 });
    }

    await connectDB();

    // 2. Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // 3. Create a query object to filter data
    const query = {};

    // 4. IMPORTANT: Modify the query based on user's role
    if (session.user.role !== 'admin') {
      // If the user is NOT an admin, show them only their own orders.
      // This matches the 'customer' field in the Order model with the logged-in user's ID.
      query.customer = session.user.id;
    }
    // If the user IS an admin, the query object remains empty, fetching ALL orders.

    
    // 5. Fetch orders from the database using the prepared query
    const orders = await Order.find(query)
      .populate({
        path: 'customer',
        model: User,
        select: 'name email' // Populate customer's name and email
      })
      .sort({ createdAt: -1 }) // Show newest orders first
      .skip(skip)
      .limit(limit);

    // 6. Count the total number of documents that match the query for pagination
    const totalOrders = await Order.countDocuments(query);

    // 7. Send the successful response
    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        total: totalOrders,
        page,
        limit,
        totalPages: Math.ceil(totalOrders / limit),
      },
    });

  } catch (error) {
    console.error('API Error in /api/sales:', error);
    return NextResponse.json({
      success: false,
      error: 'An internal server error occurred.',
    }, { status: 500 });
  }
}