import {
  createOrderSuccess, createOrderFailure, getOrderSuccess,
} from './cartRedux';
import { userRequest } from '../api/http';

export const createOrder = async (dispatch, order) => {
  try {
    const res = await userRequest.post('/order', order);
    await dispatch(createOrderSuccess(res.data));
    localStorage.removeItem('cartOrders');
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
