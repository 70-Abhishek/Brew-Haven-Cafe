const express = require('express');
const Order = require('../models/Order.cjs');
const Loyalty = require('../models/Loyalty.cjs');
const { sendOrderConfirmation } = require('../services/email.cjs');
const router = express.Router();

// ============================================
// 1. Create a new order – PUBLIC (no auth)
// ============================================
router.post('/', async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.userId) delete data.userId;

    const order = new Order(data);
    await order.save();

    // Emit new order to admin via Socket.io
    if (req.io) {
      req.io.emit('newOrder', order);
    }

    // Send order confirmation email (async, don't block response)
    try {
      await sendOrderConfirmation(order, data.userEmail);
    } catch (err) {
      console.error('Email error:', err);
    }

    // Award loyalty points: 1 point per ₹100 spent
    const points = Math.floor(order.total / 100);
    if (points > 0 && data.userId) {
      let loyalty = await Loyalty.findOne({ userId: data.userId });
      if (!loyalty) {
        loyalty = new Loyalty({ userId: data.userId, points: 0, totalEarned: 0 });
      }
      loyalty.points += points;
      loyalty.totalEarned += points;
      loyalty.transactions.push({
        type: 'earned',
        amount: points,
        description: `Order #${order._id}`,
        orderId: order._id
      });
      await loyalty.save();
      order.loyaltyPointsEarned = points;
      await order.save();
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================================
// 2. Get orders for current user (by email or userId)
//    PUBLIC – guests can fetch by email query param
// ============================================
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    let query = {};

    if (email && email.trim() !== '') {
      query.userEmail = email;
    } else {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (token) {
        try {
          const jwt = require('jsonwebtoken');
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          query.userId = decoded.id;
        } catch (err) {
          // ignore invalid token
        }
      }
    }

    if (Object.keys(query).length === 0) {
      return res.json([]);
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================================
// 3. Get a single order by ID – PUBLIC (for tracking)
// ============================================
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================================
// 4. Update order status – PUBLIC (for kitchen simulation)
//    Emits socket event on status change
// ============================================
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (req.io) {
      req.io.emit('orderStatusUpdated', order);
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;