const express = require('express');
const User = require('../models/User.cjs');
const Order = require('../models/Order.cjs');
const Loyalty = require('../models/Loyalty.cjs');
const auth = require('../middleware/auth');
const router = express.Router();

// Get profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    const loyalty = await Loyalty.findOne({ userId: req.userId });
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(10);
    res.json({ user, loyalty, orders });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update profile
router.put('/', auth, async (req, res) => {
  try {
    const { displayName, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(req.userId, { displayName, phone, address }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Order history (all orders)
router.get('/orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;