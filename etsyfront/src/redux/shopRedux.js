import { createSlice } from '@reduxjs/toolkit';

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    currentShop: null,
    currentCategories: null,
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
    },
    shopCreateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getShopCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.currentCategories = action.payload;
    },
    getShopCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    shopProductCreateSuccess: (state, action) => {
      state.isFetching = false;
      state.currentShop = action.payload;
    },
    shopProductUpdateSuccess: (state, action) => {
      state.isFetching = false;
      state.currentShop = action.payload;
    },
  },
});

export const {
  getShopStart, getShopSuccess, getShopFailure, shopCreateSuccess, shopCreateFailure, getShopCategorySuccess, getShopCategoryFailure, shopProductCreateSuccess, shopProductUpdateSuccess,
} = shopSlice.actions;
export default shopSlice.reducer;
