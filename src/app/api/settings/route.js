// src/app/api/settings/route.js (Complete & Corrected Version)

import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from '@/lib/db';
import User from '@/models/User';
import Settings from '@/models/Settings';
import bcrypt from 'bcryptjs';

// GET function: Fetches user and application settings
export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const userProfile = await User.findById(session.user.id).select('name email role');
    if (!userProfile) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }
    
    let appSettings = null;
    if (session.user.role === 'admin') {
      // findOneAndUpdate with upsert is a single, atomic operation to get or create settings
      appSettings = await Settings.findOneAndUpdate(
        { singleton: true }, // find by this unique key
        { $setOnInsert: { singleton: true } }, // if it doesn't exist, set this on creation
        { upsert: true, new: true } // options: create if not found, and return the new doc
      );
    }

    return NextResponse.json({ success: true, userProfile, appSettings });
  } catch (error) {
    console.error('API GET /settings Error:', error);
    return NextResponse.json({ success: false, error: 'An internal server error occurred.' }, { status: 500 });
  }
}

// PUT function: Updates user or application settings
export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    await connectDB();
    let message = '';

    // Using if...else if to handle different update types exclusively
    
    // === Profile Name Update Logic ===
    if (body.name) {
      if (body.name.length < 3) {
        return NextResponse.json({ success: false, error: 'Name must be at least 3 characters.' }, { status: 400 });
      }
      await User.findByIdAndUpdate(session.user.id, { name: body.name });
      message = 'Profile updated successfully!';
    }
    
    // === Password Update Logic ===
    else if (body.currentPassword && body.newPassword) {
      const user = await User.findById(session.user.id).select('+password');
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
      }

      const isMatch = await bcrypt.compare(body.currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({ success: false, error: 'Incorrect current password.' }, { status: 400 });
      }

      // We don't need to hash it here. The pre-save hook in the User model will do it.
      user.password = body.newPassword; 
      await user.save();
      message = 'Password updated successfully!';
    }
    
    // === App Settings Update Logic (Admin Only) ===
    else if (session.user.role === 'admin' && body.appSettings) {
      await Settings.findOneAndUpdate({ singleton: true }, body.appSettings, { upsert: true, new: true });
      message = 'Application settings updated successfully!';
    }
    
    // === Handle case where no valid data is sent ===
    else {
      return NextResponse.json({ success: false, error: 'Invalid or empty update data provided.' }, { status: 400 });
    }

    // Return a single success response
    return NextResponse.json({ success: true, message });

  } catch (error) {
    console.error('API PUT /settings Error:', error);
    return NextResponse.json({ success: false, error: 'An internal server error occurred.' }, { status: 500 });
  }
}