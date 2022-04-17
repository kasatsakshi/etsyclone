import {
  addCartSuccess, addCartFailure, createOrderSuccess, createOrderFailure, getOrderSuccess,
} from './cartRedux';
import { publicRequest } from '../api/http';

export const addToCart = async (dispatch, order) => {
  try {
    await dispatch(addCartSuccess(order));
  } catch (err) {
    console.log(err);
    dispatch(addCartFailure());
  }
};

export const createOrder = async (dispatch, order) => {
  try {
    const res = await publicRequest.post('/order', order);
    await dispatch(createOrderSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(createOrderFailure());
  }
};

export const getOrders = async (dispatch, user) => {
  try {
    const res = await publicRequest.get(`/orders/${user.id}`);
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};
