const express = require('express');
const {
  connectToDatabase,
  setMiddleware,
  apiSetup,
} = require('./app.service');

const app = express();

// Connect with database
connectToDatabase();

// Set middleware
setMiddleware(app);

// Routes
apiSetup(app);

module.exports = app;
