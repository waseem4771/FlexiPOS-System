// File Path: src/models/Supplier.js

import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Supplier name is required.'],
    unique: true,
    trim: true,
  },
  contactPerson: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true 
});

export default mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema);