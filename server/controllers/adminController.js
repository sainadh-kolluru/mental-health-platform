const User = require('../models/User');
const ForumPost = require('../models/ForumPost');
const Resource = require('../models/Resource');
const Mood = require('../models/Mood');

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.getReportedPosts = async (req, res) => {
  const posts = await ForumPost.find({ reports: { $gte: 2 } }).sort({ reports: -1 });
  res.json(posts);
};

exports.deletePost = async (req, res) => {
  await ForumPost.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
};

exports.getResourceStats = async (req, res) => {
  const resources = await Resource.find();
  const counts = resources.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});
  res.json(counts);
};

exports.getMoodStats = async (req, res) => {
  const moods = await Mood.find();
  const moodLevels = [0, 0, 0, 0, 0];
  moods.forEach(m => moodLevels[m.moodLevel - 1]++);
  res.json(moodLevels);
};
