const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authConfig } = require('../../config');

// Validates if the user has correct password for his account or not
const validateUser = (data, user, callback) => {
  var result = bcrypt.compareSync(data.password, user.password);

  if (result) {
    callback(null, result);
  } else {
    callback('err');
  }
};

const changePassword = (data, userData, callback) => {
  const result = bcrypt.compareSync(userData.oldpassword, data.password);
  if (result) {
    callback(null, result);
  } else {
    callback('err');
  }
};

// Function that generates the key when the user login
const generateKey = (userdata, callback) => {
  jwt.sign(userdata, authConfig.secretKey, callback);
};

// Function that validates if the user has the key or not
const validateKey = (token, callback) => {
  jwt.verify(token, authConfig.secretKey, callback);
};

module.exports = {
  validateUser,
  generateKey,
  validateKey,
  changePassword,
};
