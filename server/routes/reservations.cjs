const express = require('express');
const Reservation = require('../models/Reservation.cjs');
const { sendReservationConfirmation } = require('../services/email.cjs');
const router = express.Router();

// ============================================
// 1. Create a reservation – PUBLIC (no auth)
// ============================================
router.post('/', async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.userId) delete data.userId;

    const reservation = new Reservation(data);
    await reservation.save();

    // Send confirmation email
    try {
      await sendReservationConfirmation(reservation, data.userEmail);
    } catch (err) {
      console.error('Email error:', err);
    }

    // Emit socket event for admin
    if (req.io) {
      req.io.emit('newReservation', reservation);
    }

    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================================
// 2. Get reservations for current user (by email or userId)
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
          // ignore
        }
      }
    }

    if (Object.keys(query).length === 0) {
      return res.json([]);
    }

    const reservations = await Reservation.find(query).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================================
// 3. Delete a reservation – PUBLIC (allow guest to cancel)
//    Uses email query param to verify ownership
// ============================================
router.delete('/:id', async (req, res) => {
  try {
    const { email } = req.query; // ?email=...

    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    // Verify email (for guests)
    if (!email || reservation.userEmail !== email) {
      return res.status(403).json({ error: 'You are not authorized to cancel this reservation' });
    }

    // Also check userId if token is present (for logged-in users)
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (reservation.userId && reservation.userId.toString() !== decoded.id) {
          return res.status(403).json({ error: 'You can only delete your own reservations' });
        }
      } catch {}
    }

    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation cancelled successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;