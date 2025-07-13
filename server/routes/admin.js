const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getReportedPosts,
  deletePost,
  getResourceStats,
  getMoodStats
} = require('../controllers/adminController');

router.get('/users', getAllUsers);
router.get('/reported-posts', getReportedPosts);
router.delete('/post/:id', deletePost);
router.get('/stats/resources', getResourceStats);
router.get('/stats/mood', getMoodStats);

module.exports = router;
