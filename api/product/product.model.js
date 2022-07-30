const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Product schema created for inserting the products data for the first time alone.
const productSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  offer: {
    type: Number,
    required: true,
  },
  mrp: {
    type: String,
    required: true,
  },
  emi: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  rating: {
    type: Object,
    required: true,
  },
  offerForYou: {
    type: Boolean,
    required: true,
  },
  todayDeal: {
    type: Boolean,
    required: true,
  },
  quantity:{
    type:Number,
    required: true,
 }
});

const productModel = mongoose.model('Products', productSchema);

module.exports = productModel;
