// server/routes/cards.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const Card = require('../models/Card');

// @route   GET /api/cards/my-card
// @desc    Get the logged-in user's card
// @access  Protected
router.get('/my-card', protect, async (req, res) => {
  try {
    const card = await Card.findOne({ user: req.userId });
    if (!card) {
      return res.status(404).json({ msg: 'Card not found for this user' });
    }
    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/cards
// @desc    Create a new card for the logged-in user
// @access  Protected
router.post('/', protect, async (req, res) => {
  console.log('--- NEW CARD REQUEST RECEIVED ---'); //
  console.log('Request Body:', req.body); //
  const { slug, displayName, title, bio, socialLinks, contact } = req.body;

  try {

    console.log('Searching for slug in database:', slug);
    const slugExists = await Card.findOne({ slug });
    console.log('Result of database search:', slugExists); // This will tell us the truth

    // Check if the user already has a card
    let existingCard = await Card.findOne({ user: req.userId });
    if (existingCard) {
      return res.status(400).json({ msg: 'User already has a card. Use PUT to update.' });
    }

    // Check if the slug is already taken
    // const slugExists = await Card.findOne({ slug });
    if (slugExists) {
      return res.status(400).json({ msg: 'This slug is already in use.' });
    }

    const newCard = new Card({
      user: req.userId,
      slug,
      displayName,
      title,
      bio,
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

// @route   PUT /api/cards
// @desc    Update the logged-in user's card
// @access  Protected
router.put('/', protect, async (req, res) => {
  const { displayName, title, bio, socialLinks, contact } = req.body;

  // Build card object based on fields submitted
  const cardFields = {};
  if (displayName) cardFields.displayName = displayName;
  if (title) cardFields.title = title;
  if (bio) cardFields.bio = bio;
  if (socialLinks) cardFields.socialLinks = socialLinks;
  if (contact) cardFields.contact = contact;

  try {
    let card = await Card.findOne({ user: req.userId });
    if (!card) {
      return res.status(404).json({ msg: 'Card not found' });
    }

    // Update the card
    card = await Card.findOneAndUpdate(
      { user: req.userId },
      { $set: cardFields },
      { new: true }
    );

    res.json(card);
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
    const card = await Card.findOne({ slug: req.params.slug }).select('-user'); // Exclude user ID
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