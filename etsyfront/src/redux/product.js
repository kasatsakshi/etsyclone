import { publicRequest } from "../api/http";
import {
  getProductsFailure, getProductsSuccess, createFavoriteProductSuccess,
  getUserFavoritesSuccess, getUserFavoritesFailure,
  createFavoriteProductFailure, deleteFavoriteProductSuccess, deleteFavoriteProductFailure,
  getSearchProductByNameSuccess, getSearchProductByNameFailure,
} from "./productRedux";

export const getProducts = async (dispatch, shop) => {
  try {
    const res = await publicRequest.get(`/products`);
    await dispatch(getProductsSuccess(res.data));
  } catch (err) {
    console.log(err);
    await dispatch(getProductsFailure());
  }
};

export const createFavoriteProduct = async (dispatch, product) => {
  try {
    const res = await publicRequest.post(`/product/favorite`, product);
    await dispatch(createFavoriteProductSuccess(res.data));
  } catch (err) {
    console.log(err);
    await dispatch(createFavoriteProductFailure());
  }
};


export const deleteFavoriteProduct = async (dispatch, product) => {
  try {
    const res = await publicRequest.post(`/product/favorite/delete`, product);
    dispatch(deleteFavoriteProductSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(deleteFavoriteProductFailure());
  }
};

export const getUserFavorites = async (dispatch, user) => {
  try {
    const res = await publicRequest.get(`/user/${user.id}/favorites`);
    dispatch(getUserFavoritesSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getUserFavoritesFailure());
  }
};

export const searchProductsByName = async (dispatch, data) => {
  try {
    console.log(data.searchParam);
    const res = await publicRequest.get(`/product/search/${data.searchParam}`);
    console.log(res.data);
    dispatch(getSearchProductByNameSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getSearchProductByNameFailure());
  }
};