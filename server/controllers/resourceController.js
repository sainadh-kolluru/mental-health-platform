const Resource = require('../models/Resource');

exports.addResource = async (req, res) => {
  try {
    const { title, content, category, type, uploadedBy } = req.body;
    const resource = await Resource.create({ title, content, category, type, uploadedBy });
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResourcesByCategory = async (req, res) => {
  try {
    const resources = await Resource.find({ category: req.params.category });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ date: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
