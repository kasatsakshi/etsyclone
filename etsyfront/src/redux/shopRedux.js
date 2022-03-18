import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    currentShop: null,
    availableShopName: false,
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
    isShopNameAvailableStart: (state) => {
      state.isFetching = true;
    },
    isShopNameAvailableSuccess: (state, action) => {
      state.isFetching = false;
      state.currentShop = action.payload;
      state.availableShopName =  true;
    },
    isShopNameAvailableFailure: (state) => {
      state.isFetching = false;
      state.availableShopName =  false;
      state.error = true;
    },
  },
});

export const { getShopStart, getShopSuccess, getShopFailure, isShopNameAvailableStart, isShopNameAvailableSuccess, isShopNameAvailableFailure } = shopSlice.actions;
export default shopSlice.reducer;