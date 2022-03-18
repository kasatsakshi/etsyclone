import { getShopStart, getShopSuccess, getShopFailure, isShopNameAvailableStart, isShopNameAvailableSuccess, isShopNameAvailableFailure } from "./shopRedux";
import { publicRequest } from "../api/http";

export const getShop = async (dispatch, user) => {
  dispatch(getShopStart());
  try {
    const res = await publicRequest.get(`/shop/${user.id}`);
    dispatch(getShopSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getShopFailure());
  }
};

export const isShopNameAvailable = async (dispatch, shop) => {
  dispatch(isShopNameAvailableStart());
  try {
    const res = await publicRequest.post("/shop/name", { name: shop.shopName});
    dispatch(isShopNameAvailableSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(isShopNameAvailableFailure());
  }
};