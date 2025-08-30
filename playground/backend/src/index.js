require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// route imports
const profileRoutes = require('./routes/profile');
const projectRoutes = require('./routes/projects');

const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// register routes
app.use('/profile', profileRoutes);
app.use('/projects', projectRoutes);


const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
