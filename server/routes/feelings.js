const express = require('express');
const router = express.Router();

// GET /api/feelings
router.get('/', (req, res) => {
  res.json({ message: 'Feelings route is working! 😌' });
});

module.exports = router;
