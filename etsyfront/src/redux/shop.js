import {
  getShopStart, getShopSuccess, getShopFailure, shopCreateSuccess,
  shopCreateFailure, getShopCategorySuccess, shopProductUpdateSuccess,
  getShopCategoryFailure, shopProductCreateSuccess,
} from './shopRedux';
import { userRequest } from '../api/http';

export const getShop = async (dispatch) => {
  dispatch(getShopStart());
  try {
    const res = await userRequest.get('/shop');
    dispatch(getShopSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getShopFailure());
  }
};

export const getShopCategories = async (dispatch, shop) => {
  try {
    const res = await userRequest.get(`/shop/${shop.id}/categories`);
    dispatch(getShopCategorySuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getShopCategoryFailure());
  }
};

export const isShopNameAvailable = async (shop) => {
  try {
    const res = await userRequest.post('/shop/name', { name: shop.shopName });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const shopCreate = async (dispatch, data) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('phone', data.phone);
  formData.append('avatarUrl', data.avatarUrl.file);
  formData.append('address', JSON.stringify(data.address));

  try {
    const res = await userRequest.post('/shop/create', formData);
    dispatch(shopCreateSuccess(res.data));
    return res.data;
  } catch (err) {
    console.log(err);
    dispatch(shopCreateFailure());
  }
};

export const shopProductCreate = async (dispatch, data) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('isCustom', data.isCustom);
  formData.append('category', data.category);
  formData.append('pictureUrl', data.pictureUrl.file);
  formData.append('price', data.price);
  formData.append('quantity', data.quantity);
  formData.append('shopId', data.shopid);

  try {
    const res = await userRequest.post('/shop/product/create', formData);
    dispatch(shopProductCreateSuccess(res.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const shopProductUpdate = async (dispatch, data) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('isCustom', data.isCustom);
  formData.append('category', data.category);
  formData.append('price', data.price);
  formData.append('quantity', data.quantity);
  formData.append('productId', data.productId);
  if (data.pictureUrl.file) {
    formData.append('pictureUrl', data.pictureUrl.file);
  } else {
    formData.append('pictureUrl', data.pictureUrl);
  }
  try {
    const res = await userRequest.post('/shop/product/update', formData);
    dispatch(shopProductUpdateSuccess(res.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
