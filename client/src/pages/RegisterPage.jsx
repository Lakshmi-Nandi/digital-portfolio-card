import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AuthForm.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const newUser = { name, email, password };
      await axios.post('http://localhost:3001/api/auth/register', newUser);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Registration failed. Please check your details or try a different email.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-branding-panel">
        <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Create Your Account
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}>
          Join our community and start building your professional digital identity today.
        </motion.p>
      </div>
      <div className="auth-form-panel">
        <motion.form 
          className="auth-form" 
          onSubmit={onSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Register</h2>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={name} onChange={onChange} required autoComplete="name" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={email} onChange={onChange} required autoComplete="email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={onChange} required minLength="6" autoComplete="new-password" />
          </div>
          <button type="submit" className="auth-button">Create Account</button>
          <p className="auth-switch-link">
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}

export default RegisterPage;