import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AuthForm.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const user = { email, password };
      const res = await axios.post('http://localhost:3001/api/auth/login', user);
      
      localStorage.setItem('token', res.data.token);
      
      alert('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-branding-panel">
        <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Welcome Back
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}>
          Access your digital portfolio and continue networking smarter.
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
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input id="login-email" type="email" name="email" value={email} onChange={onChange} required autoComplete="email" />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input id="login-password" type="password" name="password" value={password} onChange={onChange} required autoComplete="current-password" />
          </div>
          <button type="submit" className="auth-button">Login</button>
          <p className="auth-switch-link">
            Don't have an account? <Link to="/register">Register Here</Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}

export default LoginPage;