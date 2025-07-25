const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use('/api/feelings', require('./routes/feelings'));


// STATIC FILES
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// ROUTES
app.use('/api/forum', require('./routes/forum'));
app.use('/api/resource', require('./routes/resource'));
app.use('/api/message', require('./routes/message'));
app.use('/api/admin', require('./routes/admin'));

// ✅ Main homepage route — this should come BEFORE the wildcard route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'forum.html'));
});

// ✅ Wildcard fallback — MUST be the last route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});

// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
