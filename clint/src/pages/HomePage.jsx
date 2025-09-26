import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <motion.h1 
        className="home-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Digital Portfolio Card
      </motion.h1>

      <motion.p 
        className="home-tagline"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Create and share your professional identity, effortlessly. Go green with digital networking.
      </motion.p>

      <motion.div 
        className="home-actions"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Link to="/login" className="home-button secondary">Login</Link>
        <Link to="/register" className="home-button primary">Register First</Link>
      </motion.div>
    </div>
  );
}

export default HomePage;