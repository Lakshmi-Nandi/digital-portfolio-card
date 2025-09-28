import React, { useState } from 'react';
import axios from 'axios';
import './CardForm.css';

function CardForm({ onSave }) {
  const [formData, setFormData] = useState({
    slug: '',
    displayName: '',
    title: '',
    bio: '',
    profilePictureUrl: '',
    socialLinks: { linkedin: '', github: '' },
    contact: { email: '', phone: '' },
  });

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
      // We only need the POST request now
      const res = await axios.post('/api/cards', formData);
      onSave(res.data); // Notify parent component (HomePage) of success
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'An unexpected error occurred.';
      console.error('Error from server:', errorMessage);
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="card-form-container">
      <form onSubmit={onSubmit} className="card-form">
        <div className="form-group">
          <label htmlFor="card-slug">Public URL Slug (e.g., your-name)</label>
          <input id="card-slug" type="text" name="slug" value={formData.slug} onChange={onChange} required />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="card-displayName">Display Name</label>
            <input id="card-displayName" type="text" name="displayName" value={formData.displayName} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="card-title">Title (e.g., Full-Stack Developer)</label>
            <input id="card-title" type="text" name="title" value={formData.title} onChange={onChange} required />
          </div>
        </div>
        <div className="form-group">
            <label htmlFor="card-pfp">Profile Picture URL</label>
            <input id="card-pfp" type="url" name="profilePictureUrl" value={formData.profilePictureUrl} onChange={onChange} placeholder="https://..." />
        </div>
        <div className="form-group">
          <label htmlFor="card-bio">Bio</label>
          <textarea id="card-bio" name="bio" value={formData.bio} onChange={onChange}></textarea>
        </div>
        <h4>Contact Info</h4>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="card-contact-email">Email</label>
            <input id="card-contact-email" type="email" name="contact.email" value={formData.contact.email} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="card-contact-phone">Phone</label>
            <input id="card-contact-phone" type="tel" name="contact.phone" value={formData.contact.phone} onChange={onChange} />
          </div>
        </div>
        <h4>Social Links</h4>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="card-linkedin">LinkedIn URL</label>
            <input id="card-linkedin" type="url" name="socialLinks.linkedin" value={formData.socialLinks.linkedin} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="card-github">GitHub URL</label>
            <input id="card-github" type="url" name="socialLinks.github" value={formData.socialLinks.github} onChange={onChange} />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">Generate My Card</button>
        </div>
      </form>
    </div>
  );
}

export default CardForm;

