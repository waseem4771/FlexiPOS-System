// File Path: src/models/Category.js

import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required.'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true // `createdAt` aur `updatedAt` fields automatically add karega
});

// Agar model pehle se compiled hai, to usay istemal karein, warna naya banayein.
// Yeh Next.js ke hot-reloading ke liye zaroori hai.
export default mongoose.models.Category || mongoose.model('Category', CategorySchema);