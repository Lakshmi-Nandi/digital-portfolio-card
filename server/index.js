require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cardRoutes = require('./routes/cards');

const app = express();

// --- START OF CORS FIX ---
// Explicitly define which origin is allowed to access the API
const corsOptions = {
  origin: 'https://digital-portfolio-card.vercel.app',
  optionsSuccessStatus: 200 // For legacy browser support
};

// Use the cors middleware with our specific options
app.use(cors(corsOptions));
// --- END OF CORS FIX ---

app.use(express.json());

// Database Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Connection error', err));

// Use Routes
app.use('/api/cards', cardRoutes); 

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});