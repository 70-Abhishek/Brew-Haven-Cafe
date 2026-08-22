const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.cjs');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, displayName });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, email, displayName } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, email, displayName: user.displayName } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Guest login
router.post('/guest', async (req, res) => {
  try {
    const { displayName, email } = req.body;
    const finalEmail = email || `guest_${Date.now()}@artisancafe.com`;
    let user = await User.findOne({ email: finalEmail });
    if (!user) {
      user = new User({ email: finalEmail, displayName, isGuest: true });
      await user.save();
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, email: user.email, displayName: user.displayName } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
