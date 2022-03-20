import { publicRequest } from "../api/http";
import { getProductsFailure, getProductsSuccess, createFavoriteProductSuccess,
  getUserFavoritesSuccess, getUserFavoritesFailure,
  createFavoriteProductFailure, deleteFavoriteProductSuccess, deleteFavoriteProductFailure } from "./productRedux";

export const getProducts = async (dispatch, shop) => {
  try {
    const res = await publicRequest.get(`/products`);
    dispatch(getProductsSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getProductsFailure());
  }
};

export const createFavoriteProduct = async (dispatch, product) => {
  try {
    const res = await publicRequest.post(`/product/favorite`, product);
    dispatch(createFavoriteProductSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(createFavoriteProductFailure());
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