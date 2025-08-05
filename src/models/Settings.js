// src/models/Settings.js
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  // Ek hi document hoga is collection mein, jise hum hamesha update karenge
  singleton: { type: Boolean, default: true, unique: true },
  
  shopName: {
    type: String,
    default: 'My POS Store'
  },
  taxRate: {
    type: Number,
    default: 5, // Default tax rate 5%
    min: 0,
    max: 100
  },
  currencySymbol: {
    type: String,
    default: '$'
  }
}, { timestamps: true });

const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

export default Settings;