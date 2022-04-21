import {
  addCartSuccess, addCartFailure, createOrderSuccess, createOrderFailure, getOrderSuccess,
} from './cartRedux';
import { publicRequest, userRequest } from '../api/http';

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
    const res = await userRequest.post('/order', order);
    await dispatch(createOrderSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(createOrderFailure());
  }
};

export const getOrders = async (dispatch) => {
  try {
    const res = await userRequest.get('/orders');
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};
