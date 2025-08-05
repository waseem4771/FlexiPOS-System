


// // src/app/api/orders/route.js (Updated for your models)

// import { NextResponse } from 'next/server';
// import { connectDB } from '@/utils/db';
// import Order from '@/models/Order';
// import Product from '@/models/Product';

// export async function POST(request) {
//   await connectDB();
//   try {
//     const body = await request.json();
//     // Aapke model ke hisab se fields extract karein
//     const { items, subtotal, tax, discount, total, paymentMethod } = body;

//     if (!items || items.length === 0 || !total || !paymentMethod) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     // Naya order banayein
//     const newOrder = new Order({
//       items,
//       subtotal,
//       tax,
//       discount,
//       total,
//       paymentMethod,
//       status: 'completed' // Ya 'pending' jaisa aap chahein
//     });
//     await newOrder.save();
    
//     // Har product ka stock update karein
//     for (const item of items) {
//       // Aapke model mein 'product' ID hai
//       await Product.findByIdAndUpdate(item.product, {
//         $inc: { stock: -item.quantity }
//       });
//     }

//     return NextResponse.json(newOrder, { status: 201 });
//   } catch (error) {
//     console.error('Order creation failed:', error);
//     return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
//   }
// }










// File Path: src/app/api/orders/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // NextAuth options import karein
import connectDB from '@/lib/dbConnect'; // Sahi DB connection file istemal karein (lib/db.js)
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User'; // User model bhi import karein, aage kaam aa sakta hai

export async function POST(request) {
  // ====================== STEP 1: Get User Session ======================
  // Sab se pehle user ka session hasil karein jo order place kar raha hai
  const session = await getServerSession(authOptions);

  // Agar user login nahi hai, to order create na karein
  if (!session || !session.user) {
    return NextResponse.json({ success: false, error: 'Unauthorized. Please log in to place an order.' }, { status: 401 });
  }

  // ======================================================================

  try {
    // connectDB() ko try block ke andar call karna behtar hai
    await connectDB();
    
    const body = await request.json();
    const { items, subtotal, tax, discount, total, paymentMethod, customerId } = body;

    // Validation check
    if (!items || items.length === 0 || !total || !paymentMethod) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // ====================== STEP 2: Determine the Customer ID ======================
    let finalCustomerId;

    // Scenario 1: Admin ek "Walk-in" customer ke liye order bana raha hai
    if (session.user.role === 'admin' && customerId) {
      // Agar POS se customer ki ID bheji gayi hai (e.g., search kar ke select kiya)
      finalCustomerId = customerId;
    } else {
      // Scenario 2: Customer khud order place kar raha hai, ya Admin apne liye
      finalCustomerId = session.user.id;
    }

    // Agar phir bhi customer ID na ho, to error dein (Walk-in ke liye null bhi rakh sakte hain)
    if (!finalCustomerId) {
        return NextResponse.json({ success: false, error: 'Customer information is missing.' }, { status: 400 });
    }
    // ==============================================================================


    // ====================== STEP 3: Create the New Order with Customer ID ======================
    // Naya order banayein aur usmein customer ki ID shamil karein
    const newOrder = new Order({
      items,
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      status: 'completed', // Default status
      customer: finalCustomerId, // <--- YEH SAB SE AHEM TABDEELI HAI
    });
    
    const savedOrder = await newOrder.save();
    // =========================================================================================

    // Har product ka stock update karein
    // Yeh logic bilkul theek tha
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    return NextResponse.json({ success: true, data: savedOrder }, { status: 201 });

  } catch (error) {
    console.error('Order creation failed:', error);
    // Behtar error message
    return NextResponse.json({ success: false, error: 'Failed to create order. ' + error.message }, { status: 500 });
  }
}