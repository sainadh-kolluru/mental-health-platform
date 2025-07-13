const express = require('express');
const router = express.Router();
const ForumPost = require('../models/ForumPost');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await ForumPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST a new post
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new ForumPost({
      title: title || '',
      content,
      user: 'Anonymous'
    });
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to save post');
  }
});

module.exports = router;
