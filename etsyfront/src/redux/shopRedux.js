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
    shopCreateSuccess: (state, action) => {
      state.isFetching = false;
      state.currentShop = action.payload;
    }
    // isShopNameAvailableStart: (state) => {
    //   state.isFetching = true;
    // },
    // isShopNameAvailableSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.currentShop = action.payload;
    // },
    // isShopNameAvailableFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
  },
});

export const { getShopStart, getShopSuccess, getShopFailure, shopCreateSuccess } = shopSlice.actions;
export default shopSlice.reducer;