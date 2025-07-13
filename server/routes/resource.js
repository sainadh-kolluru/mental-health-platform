const express = require('express');
const router = express.Router();
const {
  addResource,
  getResourcesByCategory,
  getAllResources
} = require('../controllers/resourceController');

router.post('/add', addResource);
router.get('/category/:category', getResourcesByCategory);
router.get('/all', getAllResources);

module.exports = router;
