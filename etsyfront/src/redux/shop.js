import { getShopStart, getShopSuccess, getShopFailure } from "./shopRedux";
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

export const isShopNameAvailable = async (shop) => {
  try {
    const res = await publicRequest.post("/shop/name", { name: shop.shopName});
    return res.data;
  } catch (err) {
    console.log(err);
  }
};