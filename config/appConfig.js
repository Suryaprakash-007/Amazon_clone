require('dotenv').config()

const serverConfig = {
  PORT: process.env.PORT,
};

// Atlast Configurations
const dbConfig = {
  uri: process.env.MONGO_URI,
};

// Secret key for JWT Validation
const authConfig = {
  secretKey: process.env.JWT_KEY,
};

module.exports = {
  serverConfig,
  dbConfig,
  authConfig,
};
