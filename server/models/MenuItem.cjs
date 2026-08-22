const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['coffee', 'fast_food', 'desserts', 'beverages', 'specials'],
    required: true,
  },
  description: String,
  price: { type: Number, required: true },
  image: String,
  tags: [String],
  calories: Number,
  prepTimeMinutes: Number,
  rating: Number,
  customizationOptions: {
    milk: [String],
    sweetness: [String],
    extras: [{ name: String, price: Number }],
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', MenuItemSchema);