import { getShopStart, getShopSuccess, getShopFailure, shopCreateSuccess } from "./shopRedux";
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

export const shopCreate = async (dispatch, data) => {
  const formData = new FormData();
  formData.append("name", data.name)
  formData.append("description", data.description);
  formData.append("phone", data.phone);
  formData.append("avatarUrl", data.avatarUrl.file);
  formData.append("address1", data.address1);
  formData.append("address2",data.address2);
  formData.append("city", data.city);
  formData.append("state", data.state);
  formData.append("country", data.country);
  formData.append("zipcode", data.zipcode);
  formData.append("userId", data.userId)

  try {
    const res = await publicRequest.post("/shop/create", formData);
    dispatch(shopCreateSuccess(res.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};