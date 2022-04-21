import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: [],
    purchases: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    addCartSuccess: (state, action) => {
      state.isFetching = false;
      state.cartProducts = action.payload;
    },
    addCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    createOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.purchases = action.payload;
      state.cartProducts = [];
    },
    createOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.purchases = action.payload;
    },
  },
});

export const {
  addCartSuccess, addCartFailure, getOrderSuccess, createOrderSuccess, createOrderFailure,
} = cartSlice.actions;
export default cartSlice.reducer;
