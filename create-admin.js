// create-admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // .env file load karne ke liye

// User model ka schema (apne model se copy karein)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'cashier', 'user'], default: 'user' }
});
const User = mongoose.model('User', UserSchema);

// Admin ki details yahan daalein
const ADMIN_EMAIL = 'ali1@gmail.com';
const ADMIN_PASSWORD = '654321';
const ADMIN_NAME = 'ali';

const createAdmin = async () => {
  try {
    // Database se connect karein
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully.');

    // Check karein ki admin pehle se hai ya nahi
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    // Password ko hash karein
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    // Naya admin user banayein
    const adminUser = new User({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin', // Role ko 'admin' set karein
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log(`Email: ${ADMIN_EMAIL}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    // Connection band karein
    mongoose.connection.close();
  }
};

createAdmin();