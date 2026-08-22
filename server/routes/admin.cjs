const express = require('express');
const Order = require('../models/Order.cjs');
const Reservation = require('../models/Reservation.cjs');
const Review = require('../models/Review.cjs');
const MenuItem = require('../models/MenuItem.cjs'); // new model
const User = require('../models/User.cjs');
const auth = require('../middleware/auth.cjs');
const admin = require('../middleware/admin.cjs');
const router = express.Router();

// Get all orders
router.get('/orders', auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update order status (admin)
router.put('/orders/:id', auth, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all reservations
router.get('/reservations', auth, admin, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Cancel reservation (admin)
router.delete('/reservations/:id', auth, admin, async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all reviews
router.get('/reviews', auth, admin, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete review (admin)
router.delete('/reviews/:id', auth, admin, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get('/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update user role (admin)
router.put('/users/:id', auth, admin, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;