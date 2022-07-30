const {
  addUser,
  getUser,
  updateUser,
  updateCart,
  updateOrderHistory,
  updateAddress,
  updatePassword,
  updateWishList,
} = require('./user.controller');
const express = require('express');
const router = express.Router();

// Route for registering the new user
router.post('/signUp', (req, res) => {
  addUser(req.body)
    .then((response) => res.send(response))
    .catch((err) =>
      res.send({ message: 'Error occured at route of signUp', err })
    );
});

// User profile updation
router.post('/updateUser', (req, res) => {
  updateUser(req.body)
    .then((response) => {
      res.send(response).status(200);
    })
    .catch((err) => res.send(err).status(403));
});

// Update the cart of the user while product is added to the cart
router.post('/updateCart', (req, res) => {
  updateCart(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => res.send(err).status(403));
});

// Route for user to login into his account
router.post('/signIn', (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(403).send({ message: 'invalid inputs' });
    } else {
      getUser(req.body)
        .then((response) => {
          res.send(response);
        })
        .catch((err) => res.send(err).status(403));
    }
  } catch (err) {
    res.send({ message: 'failed to complete request' }).status(403);
  }
});

// Update the order history when a order is placed
router.post('/placeOrder', (req, res) => {
  updateOrderHistory(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => res.send(err).status(403));
});

// Address update route
router.post('/updateAddress', (req, res) => {
  updateAddress(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => res.send(err).status(403));
});

// Change password route
router.put('/updatePassword', (req, res) => {
  updatePassword(req.body)
    .then((response) => {
      res.send(response).status(200);
    })
    .catch((err) => res.send(err).status(402));
});

// Route for wishlist
router.post('/updateWishList', (req, res) => {
  if (req.body.id) {
    // Array without the removed product
    const filteredArr = req.body.wishList.filter((i) => i.id !== req.body.id);
    req.body.wishListState = filteredArr;
    updateWishList(req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((err) =>
        res.send({ message: 'Error occured at update wish list route !', err })
      );
  } else {
    updateWishList(req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((err) =>
        res.send({ message: 'Error occured at update wish list route !', err })
      );
  }
});

module.exports = router;
