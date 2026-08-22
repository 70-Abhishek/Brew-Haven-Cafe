const express = require('express');
const Review = require('../models/Review.cjs');
const auth = require('../middleware/auth.cjs');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { userName, userAvatar, rating, comment, favoriteDish } = req.body;
    if (!userName || !rating || !comment) {
      return res.status(400).json({ error: 'Name, rating, and comment are required' });
    }
    const review = new Review({
      userId: req.userId,
      userName,
      userAvatar: userAvatar || '',
      rating,
      comment,
      favoriteDish: favoriteDish || '',
      helpfulCount: 0,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id/helpful', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { helpfulCount: 1 } },
      { new: true }
    );
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    if (review.userId && review.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'You can only delete your own reviews' });
    }
    await review.deleteOne();
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
