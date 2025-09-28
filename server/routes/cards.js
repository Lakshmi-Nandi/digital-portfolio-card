const express = require('express');
const router = express.Router();
// We no longer need 'protect' middleware
const Card = require('../models/Card');

// @route   POST /api/cards
// @desc    Create a new card (now public)
// @access  Public
router.post('/', async (req, res) => {
  // We now also get profilePictureUrl from the body
  const { slug, displayName, title, bio, profilePictureUrl, socialLinks, contact } = req.body;

  try {
    // Check if the slug is already taken (this is still important)
    const slugExists = await Card.findOne({ slug });
    if (slugExists) {
      return res.status(400).json({ msg: 'This URL slug is already in use. Please try another.' });
    }

    // Create the new card without a user ID
    const newCard = new Card({
      slug,
      displayName,
      title,
      bio,
      profilePictureUrl,
      socialLinks,
      contact,
    });

    const card = await newCard.save();
    res.status(201).json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/cards/:slug
// @desc    Get a card by its public slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    // The .select('-user') is no longer needed as the user field is gone
    const card = await Card.findOne({ slug: req.params.slug });
    if (!card) {
      return res.status(404).json({ msg: 'Card not found' });
    }
    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

