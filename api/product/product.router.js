const {
  getProducts,
  confirmOrder,
  getOTP,
  getOrderId,
  addProducts,
  updateStock,
} = require('./product.controller');

const router = require('express').Router();

// Route to get all the products details from the DB
router.get('/getProducts', async (req, res) => {
  const data = await getProducts();
  res.send(data).status(200);
});

// Route to send sms/mail for the conformation of the order placed
router.post('/confirmOrder', (req, res) => {
  confirmOrder(req.body)
    .then((response) => {
      res.send(response.message).status(200);
    })
    .catch((err) => res.send(err).status(403));
});

// Route that genrates OTP for the user to be validtaed before editing their user info
router.post('/getOTP', (req, res) => {
  getOTP(req.body)
    .then((response) => {
      res.send(response.message);
    })
    .catch((err) => res.send(err));
});

// Route to genrate the order ID on each orders placed
router.get('/orderId', (req, res) => {
  getOrderId()
    .then((response) => {
      res.send(response.message);
    })
    .catch((err) => res.send(err));
});

router.get('/addProduct', (req, res) => {
  addProducts();
  // .then((response) => {
  //   res.send(response.message);
  // })
  // .catch((err) => res.send(err));
});

// Update stock router
router.post('/updateStock', (req, res) => {
  // Req body should have like Eg:[{id:1,qty:3}]
  updateStock(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => res.send({ message: 'Error', err }));
});

module.exports = router;
