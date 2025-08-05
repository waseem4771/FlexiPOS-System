import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    await dbConnect();
    
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Email already registered' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create new user
    const user = await User.create({ name, email, password });

    return new Response(
      JSON.stringify({ 
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
        }
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Registration failed' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}