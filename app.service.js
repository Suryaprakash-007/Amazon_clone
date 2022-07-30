const { connectMongo ,getConnectMongo} = require('./database');
const express = require('express');
const api = require('./api');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const compression = require("compression")

// Connecting to database
const connectToDatabase = () => {
  connectMongo();
  // console.log(getConnectMongo())
};

// Setting up the middleware
const setMiddleware = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(compression())
  app.use(helmet())
  app.use(bodyParser.json());
};



// Routes
const apiSetup = (app) => {
  app.use('/api', api);
};

module.exports = {
  connectToDatabase,
  setMiddleware,
  apiSetup,
};
