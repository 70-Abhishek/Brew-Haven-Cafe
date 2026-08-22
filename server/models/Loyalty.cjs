const mongoose = require('mongoose');

const LoyaltySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  totalEarned: { type: Number, default: 0 },
  transactions: [{
    type: { type: String, enum: ['earned', 'redeemed'] },
    amount: Number,
    description: String,
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Loyalty', LoyaltySchema);