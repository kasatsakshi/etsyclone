import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    currentProducts: null,
    favoriteProducts: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.currentProducts = action.payload;
    },
    getProductsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    createFavoriteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.favoriteProducts = action.payload;
    },
    createFavoriteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteFavoriteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.favoriteProducts = action.payload;
    },
    deleteFavoriteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getUserFavoritesSuccess: (state, action) => {
      state.isFetching = false;
      state.favoriteProducts = action.payload;
    },
    getUserFavoritesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  }
});

export const { getProductsSuccess, getProductsFailure, createFavoriteProductSuccess, 
  createFavoriteProductFailure, deleteFavoriteProductSuccess, getUserFavoritesSuccess, getUserFavoritesFailure,
  deleteFavoriteProductFailure } = productsSlice.actions;
export default productsSlice.reducer;