const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/student');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/students', require('./routes/student'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/studentdb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));