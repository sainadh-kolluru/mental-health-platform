const mongoose = require('mongoose');

const ForumPostSchema = new mongoose.Schema({
  title: String,
  content: { type: String, required: true },
  user: { type: String, default: 'Anonymous' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ForumPost', ForumPostSchema);
