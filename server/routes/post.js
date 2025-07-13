const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  reactToPost,
  commentOnPost
} = require('../controllers/postController');

router.post('/create', createPost);
router.get('/all', getAllPosts);
router.post('/:id/react', reactToPost);
router.post('/:id/comment', commentOnPost);

module.exports = router;
