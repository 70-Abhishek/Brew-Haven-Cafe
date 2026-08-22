const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // guests may not have a user account
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPhone: {
    type: String,
    required: true,
  },
  date: {
    type: String, // YYYY-MM-DD
    required: true,
  },
  time: {
    type: String, // e.g. "18:30"
    required: true,
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
  },
  seatingArea: {
    type: String,
    enum: ['Indoor Cozy Booth', 'Sunlit Garden Patio', 'Skyview Rooftop', 'Private Lounge'],
    required: true,
  },
  specialRequest: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['confirmed', 'completed', 'cancelled'],
    default: 'confirmed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reservation', ReservationSchema);
