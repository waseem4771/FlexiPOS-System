import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  cost: {
    type: Number,
    required: [true, 'Product cost is required'],
    min: 0
  },
  barcode: {
    type: String,
    unique: true,
    sparse: true
  },
  category: {
    type: String,
    required: [true, 'Product category is required']
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: 0
  },
  minStock: {
    type: Number,
    default: 5,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ProductSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);