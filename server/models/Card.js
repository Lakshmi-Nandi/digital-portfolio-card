const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  displayName: {
    type: String,
  },
  title: {
    type: String,
  },
  bio: {
    type: String,
  },
  profilePictureUrl: {
    type: String,
    default: '',
  },
  socialLinks: {
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    twitter: { type: String, default: '' },
  },
  contact: {
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
  },
}, { timestamps: true });

module.exports = mongoose.model('Card', CardSchema);