const ForumTopic = require('../models/ForumTopic');
const ForumPost = require('../models/ForumPost');

exports.createTopic = async (req, res) => {
  const { title, description, createdBy } = req.body;
  const topic = await ForumTopic.create({ title, description, createdBy });
  res.status(201).json(topic);
};

exports.getTopics = async (req, res) => {
  const topics = await ForumTopic.find().sort({ createdAt: -1 });
  res.json(topics);
};

exports.createPost = async (req, res) => {
  const { message, createdBy } = req.body;
  const post = await ForumPost.create({ topicId: req.params.topicId, message, createdBy });
  res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await ForumPost.find({ topicId: req.params.topicId }).sort({ createdAt: 1 });
  res.json(posts);
};

exports.upvotePost = async (req, res) => {
  const post = await ForumPost.findById(req.params.postId);
  post.upvotes++;
  await post.save();
  res.json(post);
};

exports.reportPost = async (req, res) => {
  const post = await ForumPost.findById(req.params.postId);
  post.reports++;
  await post.save();
  res.json(post);
};
