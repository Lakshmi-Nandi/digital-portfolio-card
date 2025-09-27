import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CardForm from '../components/CardForm';
import CardPreview from '../components/CardPreview';
import setAuthToken from '../api/axiosConfig';
import './DashboardPage.css';

function DashboardPage() {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchCard = useCallback(async () => {
    try {
      const res = await axios.get('/cards/my-card');
      setCard(res.data);
    } catch (err) {
      console.log("No card found for this user.");
      setCard(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCard();
  }, [fetchCard]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    navigate('/login');
  };

  const handleSave = (savedCard) => {
    setCard(savedCard);
    setShowForm(false);
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">Cardify</div>
        <nav className="sidebar-nav">
          <button className="sidebar-button">Dashboard</button>
          {/* Add more nav links here in the future */}
        </nav>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </aside>

      <main className="dashboard-main">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <header className="dashboard-header">
            <h1>Welcome to Your Dashboard</h1>
            <p>Manage your digital portfolio card here.</p>
          </header>

          {loading ? (
            <p>Loading...</p>
          ) : showForm ? (
            <CardForm 
              initialData={card} 
              onSave={handleSave}
              onCancel={() => setShowForm(false)}
            />
          ) : card ? (
            <div className="card-preview-container">
              <CardPreview card={card} onEdit={() => setShowForm(true)} />
            </div>
          ) : (
            <div className="no-card-display">
              <h2>Create Your First Card</h2>
              <p>You haven't created a card yet. Get started now!</p>
              <button onClick={() => setShowForm(true)} className="preview-button edit-btn">Create Card</button>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default DashboardPage;