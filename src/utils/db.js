



// File Path: src/utils/db.js

import mongoose from 'mongoose';

// Connection object to cache the connection
let connection = {};

export async function connectDB() {
  // Agar pehle se connected hai, toh dobara connect na karein
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  // Agar MONGODB_URI nahi hai, toh error throw karein
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  try {
    // Naya connection banayein
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("New database connection established.");
  } catch (error) {
    console.error("Database connection failed:", error);
    // Application ko exit kar dega agar connection fail hota hai
    process.exit(1);
  }
}