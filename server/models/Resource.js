const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  type: { type: String, enum: ['article', 'video'], default: 'article' },
  uploadedBy: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', ResourceSchema);
