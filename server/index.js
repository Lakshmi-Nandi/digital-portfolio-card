require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// We only need to import the card routes now
const cardRoutes = require('./routes/cards');

// Initialize Express app
const app = express();

// Middleware
// A simpler CORS setup is better for this project. This allows all origins.
app.use(cors()); 
app.use(express.json()); // for parsing application/json

// Database Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Connection error', err));

// Use Routes
// The authRoutes line has been removed
app.use('/api/cards', cardRoutes); 

// Start the server
// Using process.env.PORT is essential for deployment on services like Render
const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

