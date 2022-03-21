import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
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
  }
});

export const { addCartSuccess, addCartFailure } = cartSlice.actions;
export default cartSlice.reducer;