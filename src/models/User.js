

// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   name: { 
//     type: String, 
//     required: [true, 'Name is required'],
//     trim: true,
//     minlength: [3, 'Name must be at least 3 characters long'],
//     maxlength: [50, 'Name cannot exceed 50 characters']
//   },
//   email: { 
//     type: String, 
//     required: [true, 'Email is required'],
//     unique: true,
//     trim: true,
//     lowercase: true,
//     validate: {
//       validator: function(v) {
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
//       },
//       message: props => `${props.value} is not a valid email address!`
//     }
//   },
//   password: { 
//     type: String, 
//     required: [true, 'Password is required'],
//     select: false,
//     minlength: [6, 'Password must be at least 6 characters long']
//   },
//   role: {
//     type: String,
//     enum: ['admin', 'cashier', 'inventory', 'user'],
//     default: 'cashier'
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   lastLogin: {
//     type: Date
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date
//   }
// });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // Update timestamp before saving
// userSchema.pre('save', function(next) {
//   this.updatedAt = new Date();
//   next();
// });

// // Password comparison method
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Virtual for user's display name
// userSchema.virtual('displayName').get(function() {
//   return this.name.split(' ')[0];
// });

// // Transform output to remove sensitive data
// userSchema.set('toJSON', {
//   virtuals: true,
//   transform: function(doc, ret) {
//     delete ret.password;
//     delete ret.__v;
//     return ret;
//   }
// });

// // Handle duplicate email error
// userSchema.post('save', function(error, doc, next) {
//   if (error.name === 'MongoError' && error.code === 11000) {
//     next(new Error('Email already exists'));
//   } else {
//     next(error);
//   }
// });

// // Export the model properly
// const User = mongoose.models.User || mongoose.model('User', userSchema);
// export default User;











// File Path: src/models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    select: false,
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: String,
    // ===== YEH LINE SAB SE AHEM HAI - Isay Update Kar Diya Gaya Hai =====
    enum: {
        values: ['admin', 'customer', 'cashier', 'manager', 'inventory_manager'],
        message: '{VALUE} is not a supported role.'
    },
    default: 'customer' // Naye users by default customer honge
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  // timestamps: true option `createdAt` aur `updatedAt` ko automatically handle karta hai
  timestamps: true 
});

// Hash password before saving if it has been modified
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Password comparison method (NextAuth ke liye zaroori)
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for user's display name
userSchema.virtual('displayName').get(function() {
  return this.name.split(' ')[0];
});

// Transform output to remove sensitive data
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

// Export the model properly
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;