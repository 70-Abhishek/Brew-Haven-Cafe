const express = require('express');
const MenuItem = require('../models/MenuItem.cjs');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({ isActive: true }).sort({ name: 1 });
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;