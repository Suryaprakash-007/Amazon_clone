import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'productsList',
  initialState: {
    products: [],
  },
  reducers: {
    // Load the products
    updateProducts(state, action) {
      const { res } = action.payload;
      state.products = res;
    },
  },
});

export const { updateProducts } = productsSlice.actions;

export default productsSlice;
