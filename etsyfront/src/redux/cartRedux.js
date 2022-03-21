import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
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
    },
    createOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  }
});

export const { addCartSuccess, addCartFailure, createOrderSuccess, createOrderFailure } = cartSlice.actions;
export default cartSlice.reducer;