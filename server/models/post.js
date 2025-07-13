const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  reactions: {
    heart: { type: Number, default: 0 },
    star: { type: Number, default: 0 }
  },
  comments: [{
    text: String,
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Post', PostSchema);
