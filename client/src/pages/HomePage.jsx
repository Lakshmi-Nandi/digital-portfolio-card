import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardForm from '../components/CardForm';
import './HomePage.css';

function HomePage() {
  const [createdCard, setCreatedCard] = useState(null);

  const handleSave = (savedCard) => {
    setCreatedCard(savedCard);
  };

  const publicUrl = createdCard ? `${window.location.origin}/${createdCard.slug}` : '';

  return (
    <div className="home-container">
      <AnimatePresence>
        {!createdCard ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="content-wrapper"
          >
            <h1 className="home-title">Create Your Digital Card</h1>
            <p className="home-tagline">
              Fill out the form below to generate your unique, shareable portfolio card instantly.
            </p>
            <CardForm onSave={handleSave} />
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="success-wrapper"
          >
            <h1 className="success-title">Success!</h1>
            <p className="success-message">Your digital card has been created.</p>
            <div className="created-card-info">
              <p>
                <span>Your Public URL is:</span>
                <a href={publicUrl} target="_blank" rel="noopener noreferrer">
                  {publicUrl}
                </a>
              </p>
            </div>
            <button 
              onClick={() => setCreatedCard(null)} 
              className="create-another-btn"
            >
              Create Another Card
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;

