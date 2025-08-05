// Ahem Note: Humne pehle db.js ko 'lib' folder mein rakha tha, isliye wohi path use karain
import connectDB from '@/lib/db'; 
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

// Yeh line API ko hamesha dynamic banati hai (caching se bachne ke liye)
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    // Woh products dhoondein jinka stock unke minimum stock level se kam ya barabar hai
    const lowStockProducts = await Product.find({
      $expr: { $lte: ['$stock', '$minStock'] }
    }).select('name stock minStock').sort({ stock: 1 }); // Stock ke hisab se sort karain

    // App Router mein NextResponse ka istemal karain
    return NextResponse.json({
      success: true,
      data: lowStockProducts,
    }, { status: 200 });

  } catch (error) {
    console.error('API Error in /api/inventory/low-stock:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch low stock items',
    }, { status: 500 });
  }
}