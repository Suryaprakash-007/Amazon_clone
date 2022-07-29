import { createSlice } from '@reduxjs/toolkit';

//user slice component
const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    isLogged: false,
    // All details that a user must have
    userList: {},
    // to be updated while user logs in,recieved from the user collection
    // To check if the user is allowed in checkout
    orderPlacing: false,
  },
  reducers: {
    logOnUser(state, action) {
      state.isLogged = true;
    },
    logOffUser(state, actions) {
      state.isLogged = false;
      state.userList = {};
    },
    addtoCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.userList.cart?.find(
        (item) => item.id === newItem.id
      );

      if (!existingItem) {
        state.userList.cart = state.userList.cart?.concat(newItem);
      } else {
        if (action.payload.qty) {
          existingItem.qty += newItem.qty;
        } else {
          existingItem.qty++;
        }
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;

      const existingItem = state.userList.cart.find((item) => item.id === id);

      if (existingItem.qty <= 1) {
        state.userList.cart = state.userList.cart.filter(
          (item) => item.id !== id
        );
      } else {
        existingItem.qty--;
      }
    },
    emptyCart(state) {
      state.userList.cartList = [];
    },
    updateUserInfo(state, action) {
      state.userList = action.payload;
    },
    updateOrderPlacing(state, action) {
      state.orderPlacing = action.payload;
    },
  },
});

export const {
  logOnUser,
  logOffUser,
  addtoCart,
  removeFromCart,
  emptyCart,
  updateUserInfo,
  updateOrderPlacing,
} = userSlice.actions;

export default userSlice;
