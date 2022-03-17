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