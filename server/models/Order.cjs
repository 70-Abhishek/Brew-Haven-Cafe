const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  userEmail: String,
  userPhone: String,
  orderType: { type: String, enum: ['dine_in', 'pickup', 'delivery'] },
  deliveryAddress: String,
  tableNumber: String,
  items: [{
    name: String,
    quantity: Number,
    price: Number,
    customizations: String,
  }],
  subtotal: Number,
  tax: Number,
  tip: Number,
  total: Number,
  paymentMethod: { type: String, enum: ['cash', 'card', 'online'] },
  status: { type: String, enum: ['received', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'completed'], default: 'received' },
  estimatedMinutes: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
