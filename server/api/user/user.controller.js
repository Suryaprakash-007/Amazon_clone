const { v4: uuidv4 } = require('uuid');
const userModel = require('./user.model');
const auth = require('../auth');
const bcrypt = require('bcrypt');

// Function to register the new user in the DB
const addUser = (userInfo) => {
  return new Promise((resolve, reject) => {
    let user = new userModel();
    user.id = uuidv4();
    user.fullName = userInfo.fullName;
    user.email = userInfo.email;
    user.password = encryptPassword(userInfo.password);
    user.mobile = userInfo.mobile;

    user.save((err, data) => {
      if (err) {
        reject({
          message: 'Error occured while registering the user',
          err,
          status: 403,
        });
      } else {
        resolve({ message: 'User is added successfully', status: 200 });
      }
    });
  });
};

// Function to crypt the password before inserting it into the DB
const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(5);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

// Function to get the user info from the DB
const getUser = (data) => {
  return new Promise((resolve, reject) => {
    userModel.findOne({ email: data.email }, (err, user) => {
      if (err) {
        reject({ message: 'Internal server error', status: 500, err: err });
      } else if (user) {
        auth.validateUser(data, user, (err, isMatch) => {
          if (isMatch && !err) {
            let payload = { email: user.email, password: user.password };
            auth.generateKey(payload, (err, token) => {
              if (err) {
                reject({
                  message: 'Internal server error',
                  status: 500,
                  err: err,
                });
              } else {
                resolve({ message: { token, user }, status: 200 });
              }
            });
          } else {
            reject({ message: 'Incorrect password', status: 403 });
          }
        });
      } else {
        reject({ message: 'User not registered', status: 403 });
      }
    });
  });
};

// Function to update the user info
//data should contain key,name,email,mobile,password
const updateUser = (userData) => {
  return new Promise((resolve, reject) => {
    auth.validateKey(userData.key, (err, callback) => {
      if (err) {
        reject({ message: 'user is not valid', status: 403 });
      } else {
        userModel.findByIdAndUpdate(
          userData.userId,
          {
            fullName: userData.fullName,
            email: userData.email,
            mobile: userData.mobile,
          },
          (err, data) => {
            if (err) {
              reject({
                message:
                  'Error occured while editing user profile in user controller !',
                data: err,
                status: 402,
              });
            } else {
              (data.fullName = userData.fullName),
                (data.email = userData.email),
                (data.mobile = userData.mobile),
                resolve({
                  message: 'user updated successfully',
                  data: data,
                  status: 200,
                });
            }
          }
        );
      }
    });
  });
};

// Function to update the cart details in the DB
//data should have key,user id,store data
const updateCart = (userData) => {
  return new Promise((resolve, reject) => {
    auth.validateKey(userData.key, (err, callback) => {
      if (err) {
        reject({ message: 'user is not valid', status: 403 });
      } else {
        userModel.findByIdAndUpdate(
          userData.userId,
          { cart: userData.cart },
          (err, data) => {
            if (err) {
              reject({
                message:
                  'Error occured during updating the cart in controller !',
                status: 403,
              });
            } else {
              if (userData.orderDetails) {
                data.cart = [];
                // data.orderHistory.push(userData.orderDetails);
                resolve({
                  message: 'Cart is emptied successfully !',
                  data: data,
                  status: 200,
                });
              }
              resolve({
                message: 'Cart is updated successfully !',
                data: data,
                status: 200,
              });
            }
          }
        );
      }
    });
  });
};

// Update the order history while order is placed
const updateOrderHistory = (orderInfo) => {
  return new Promise((resolve, reject) => {
    // Get the current order history details from DB
    userModel.findById(orderInfo.userId, (err, user) => {
      if (err) {
        reject({
          message: 'Error Occured at getting user for order history updation !',
          status: 403,
        });
      } else {
        // insert the current order details to the exisiting order details in the DB
        const updatedOrderArr = user.orderHistory.concat([
          {
            orderId: orderInfo.orderId,
            orderDate: orderInfo.orderDate,
            orderPrice: orderInfo.orderPrice,
            orderStatus: orderInfo.orderStatus,
          },
        ]);

        userModel.findByIdAndUpdate(
          orderInfo.userId,
          { orderHistory: updatedOrderArr },
          (err, data) => {
            if (err) {
              reject({
                message:
                  'Error occured during the updation of order history in controller !',
                status: 403,
              });
            } else {
              resolve({
                message: 'Order History is updated successfully !',
                status: 200,
              });
            }
          }
        );
      }
    });
  });
};

// Update address
const updateAddress = ({ key, address, userId }) => {
  return new Promise((resolve, reject) => {
    auth.validateKey(key, (err, callback) => {
      if (err) {
        reject({ message: 'user is not valid', status: 403 });
      } else {
        userModel.updateOne(
          { _id: userId },
          { $set: { address: address } },
          (err, data) => {
            if (err) {
              console.log(err);
              reject({
                message:
                  'Error occured during updating the cart in controller !',
                status: 403,
              });
            } else {
              resolve({
                message: 'Address is updated successfully !',
                // data: data,
                status: 200,
              });
            }
          }
        );
      }
    });
  });
};

// Update password
const updatePassword = (userData) => {
  return new Promise((resolve, reject) => {
    auth.validateKey(userData.key, (err, callback) => {
      if (err) {
        reject({ message: 'user is not valid', status: 403 });
      } else {
        userModel.findById(userData.userId, (err, data) => {
          if (err)
            reject({
              message: 'Error occured during find user in change password!',
              status: '401',
            });
          else {
            // To check if old password is the same as given
            auth.changePassword(data, userData, (err, isMatch) => {
              if (isMatch && !err) {
                const newPassword = encryptPassword(userData.newpassword);
                userModel.findByIdAndUpdate(
                  userData.userId,
                  {
                    password: newPassword,
                  },
                  (err, data) => {
                    if (err)
                      reject({
                        message: 'Error occured at updating the password',
                        status: 402,
                      });
                    resolve({
                      message: 'Password has been changed',
                      status: 200,
                    });
                  }
                );
              } else {
                reject({
                  message: 'Old password does not match !',
                  status: 403,
                });
              }
            });
          }
        });
      }
    });
  });
};

// Function to update the wish list
const updateWishList = (userData) => {
  const newList = userData.wishListState;
  if (userData.currentWish) {
    const currList = userData.currentWish;
    newList.push(currList);
  }
  return new Promise((resolve, reject) => {
    auth.validateKey(userData.key, (err, callback) => {
      if (err) {
        reject({ message: 'User is not valid', status: 403 });
      } else {
        userModel.findByIdAndUpdate(
          userData.userId,
          {
            wishList: newList,
          },
          (err, data) => {
            if (err) {
              reject({
                message:
                  'Error occured while updating wish list in controller !',
                data: err,
                status: 402,
              });
            } else {
              data.wishList = newList;
              resolve({
                message: 'Wish list updated successfully !',
                data: data,
                status: 200,
              });
            }
          }
        );
      }
    });
  });
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  updateCart,
  updateOrderHistory,
  updateAddress,
  updatePassword,
  updateWishList,
};
