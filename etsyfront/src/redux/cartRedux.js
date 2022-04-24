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
  getOrderSuccess, createOrderSuccess, createOrderFailure,
} = cartSlice.actions;
export default cartSlice.reducer;
