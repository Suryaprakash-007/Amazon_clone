var generator = require('otp-generator');
const productModel = require('./product.model');
const { sendMail, sendSMS } = require('./productServices/product.services');
const { v4: uuidv4 } = require('uuid');

// Function that retrieves the data of all the products from the DB
const getProducts = async () => {
  const products = await productModel.find({});
  return products;
};

// Function that send the confirmation mail to the user after placing the order
const confirmOrder = (data) => {
  return new Promise((resolve, reject) => {
    try {
      sendMail(data);
      sendSMS(data);
      resolve({ message: 'order details shared to the user' });
    } catch (err) {
      reject({ message: 'Error occured while sending SMS and Mail !' });
    }
  });
};

// Function that generates the OTP for the user to vaildate before the user can edit his user information in the edit profile.
const getOTP = (data) => {
  return new Promise((resolve, reject) => {
    const otp = generator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    try {
      var phone = data.mobile;
      sendSMS({ otp, phone });
    } catch (err) {}
    resolve({ message: otp, status: 200 });
  });
};

// Function that genrates order ID for each orders that is placed
const getOrderId = () => {
  return new Promise((resolve, reject) => {
    const orderId = generator.generate(7, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    resolve({ message: orderId, status: 200 });
  });
};

// For Adding Products manually
const addingproducts = [];

const addProducts = () => {
  addingproducts.map((i) => {
    addProduct(i);
  });
};

const addProduct = (product) => {
  const products = new productModel();
  products.id = product.id + 20;
  products.offer = product.offer;
  products.mrp = product.mrp;
  products.emi = product.emi;
  products.name = product.name;
  products.price = product.price;
  products.description = product.description;
  products.category = product.category;
  products.imgUrl = product.imgurl;
  products.rating = product.rating;
  products.offerForYou = product.offerForYou;
  products.todayDeal = product.todayDeal;
  products.quantity = product.availability;

  products.save((err, data) => {
    if (err) {
      console.log('Please provide sufficient product data', err);
      throw new Error();
    } else {
      console.log('Successfully added the product to DB');
    }
  });
};

// Maintain the quantity of the product stock
const updateStock = (cartData) => {
  // Use id,qty from the cartData
  return new Promise(async (resolve, reject) => {
    try {
      cartData.forEach(async (i) => {
        await productModel.findOne({ id: i.id }).then(async (response) => {
          if (response) {
            const qty = response.quantity - i.qty;
            await productModel.findOneAndUpdate(
              { id: i.id },
              { quantity: qty }
            );
          }
        });
      });
      resolve({
        message: 'Successfully updated the stock',
      });
    } catch (err) {
      reject({ message: 'Error occured at updating stock', err });
    }
  });
};

module.exports = {
  getProducts,
  confirmOrder,
  getOTP,
  getOrderId,
  addProducts,
  updateStock,
};
