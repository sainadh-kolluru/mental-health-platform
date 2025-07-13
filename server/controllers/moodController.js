const Mood = require('../models/Mood');

// POST /api/mood/track
exports.trackMood = async (req, res) => {
  const { userId, mood } = req.body;

  try {
    const newEntry = await Mood.create({ userId, mood });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/mood/:userId
exports.getMoodHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const history = await Mood.find({ userId }).sort({ date: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
