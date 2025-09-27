import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CardForm.css';

function CardForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    slug: '',
    displayName: '',
    title: '',
    bio: '',
    socialLinks: { linkedin: '', github: '', twitter: '' },
    contact: { email: '', phone: '' },
  });

  useEffect(() => {
    if (initialData) {
      // If editing, pre-fill the form with existing data
      setFormData({
        slug: initialData.slug || '',
        displayName: initialData.displayName || '',
        title: initialData.title || '',
        bio: initialData.bio || '',
        socialLinks: { ...initialData.socialLinks },
        contact: { ...initialData.contact },
      });
    }
  }, [initialData]);

  const onChange = e => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      let res;
      if (initialData) {
        // If initialData exists, we are updating (PUT)
        res = await axios.put('/cards', formData);
      } else {
        // Otherwise, we are creating (POST)
        res = await axios.post('/cards', formData);
      }
      onSave(res.data); // Notify parent component
    } catch (err) {
      // --- START OF CHANGED CODE ---
      // Get the specific error message from the backend, or show a default one.
      const errorMessage = err.response?.data?.msg || 'An unexpected error occurred.';
      console.error('Error from server:', errorMessage);
      alert(`Error: ${errorMessage}`); // Display the REAL error
      // --- END OF CHANGED CODE ---s
    }
  };

  return (
    <div className="card-form">
      <h3>{initialData ? 'Edit Your Card' : 'Create Your Card'}</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Public URL Slug (e.g., your-name)</label>
          <input type="text" name="slug" value={formData.slug} onChange={onChange} required disabled={!!initialData} />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Display Name</label>
            <input type="text" name="displayName" value={formData.displayName} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label>Title (e.g., Full-Stack Developer)</label>
            <input type="text" name="title" value={formData.title} onChange={onChange} required />
          </div>
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea name="bio" value={formData.bio} onChange={onChange}></textarea>
        </div>
        <h4>Contact Info</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="contact.email" value={formData.contact.email} onChange={onChange} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="contact.phone" value={formData.contact.phone} onChange={onChange} />
          </div>
        </div>
        <h4>Social Links</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>LinkedIn URL</label>
            <input type="url" name="socialLinks.linkedin" value={formData.socialLinks.linkedin} onChange={onChange} />
          </div>
          <div className="form-group">
            <label>GitHub URL</label>
            <input type="url" name="socialLinks.github" value={formData.socialLinks.github} onChange={onChange} />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">Save Card</button>
          <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CardForm;