const express = require('express');
const router = express.Router();
const { trackMood, getMoodHistory } = require('../controllers/moodController');

router.post('/track', trackMood);
router.get('/:userId', getMoodHistory);

module.exports = router;
