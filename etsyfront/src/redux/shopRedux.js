import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    currentShop: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getShopStart: (state) => {
      state.isFetching = true;
    },
    getShopSuccess: (state, action) => {
      state.isFetching = false;
      state.currentShop = action.payload;
    },
    getShopFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getShopStart, getShopSuccess, getShopFailure } = shopSlice.actions;
export default shopSlice.reducer;