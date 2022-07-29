const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema in DB
const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    street: String,
    city: String,
    pincode: String,
    state: String,
    country: String,
  },
  cart: [],
  orderHistory: [],
  wishList: [],
});

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;
