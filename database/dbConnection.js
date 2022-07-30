const mongoose = require('mongoose');
const { dbConfig } = require('../config');

// Function to connect the DB with the backend
const connectMongo = () => {
  try {
    mongoose.connect(
      dbConfig.uri,
      {
      
        useNewUrlParser: true,
        useUnifiedTopology: true,
        server:{
          socketOptions:{
            keepAlive:300000,
            connectTimeoutMS:30000
          }
        },
        replset:{
          socketOptions:{
            keepAlive:300000,
            connectTimeoutMS:30000
          }
        }
       
      },
      () => console.log('Mongoose is connected')
    );
  } catch (err) {
    console.log('Error occured at connecting the mongoose');
  }
};

// FUnction to check if mongoose is connected with DB
const getConnectMongo = () => {
  return mongoose.connection;
};

module.exports = {
  connectMongo,
  getConnectMongo,
};
