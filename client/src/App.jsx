import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// We only need to import the two pages that are left
import HomePage from './pages/HomePage';
import CardViewPage from './pages/CardViewPage';

function App() {
  return (
    <Routes>
      {/* The homepage now shows the form to create a card */}
      <Route path="/" element={<HomePage />} />
      
      {/* This route displays the public card after it's been created */}
      <Route path="/:slug" element={<CardViewPage />} />
    </Routes>
  );
}

export default App;

