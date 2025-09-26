// server/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/cards');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Database Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Connection error', err));

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Use Routes
app.use('/api/auth', authRoutes); // Add this line
app.use('/api/cards', cardRoutes); 

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});