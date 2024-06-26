const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define routes
app.use('/users', usersRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
