
import mongoose from 'mongoose';

// Enable debugging in development
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let cached = global.mongoose || { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then(mongoose => {
        console.log('✅ MongoDB Connected');
        return mongoose;
      })
      .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err)
  {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
};

// SIRF DEFAULT EXPORT ISTEMAL KARAIN - YEH BEST PRACTICE HAI
export default connectDB;