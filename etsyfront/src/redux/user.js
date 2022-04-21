import {
  loginFailure, loginStart, loginSuccess, logoutUser,
  signupStart, signupSuccess, signupFailure, accountInfoStart,
  accountInfoSuccess, accountInfoFailure, updateUserInfoSuccess,
  updateUserCurrencySuccess,
} from './userRedux';
import { publicRequest, userRequest } from '../api/http';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/login', user);
    const token = res.headers['x-auth-token'];
    localStorage.setItem('token', token);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const signup = async (dispatch, user) => {
  dispatch(signupStart());
  try {
    const res = await publicRequest.post('/signup', user);
    const token = res.headers['x-auth-token'];
    localStorage.setItem('token', token);
    dispatch(signupSuccess(res.data));
  } catch (err) {
    dispatch(signupFailure());
  }
};

export const accountInfo = async (dispatch, user) => {
  dispatch(accountInfoStart());
  try {
    const res = await userRequest.get('/user');
    dispatch(accountInfoSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(accountInfoFailure());
  }
};

export const updateUserInfo = async (dispatch, data) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('address', JSON.stringify(data.address));
    formData.append('bio', data.bio);
    formData.append('phone', data.phone);
    formData.append('gender', data.gender);
    formData.append('birthday', data.birthday);
    if (data.avatarUrl.file) {
      formData.append('avatarUrl', data.avatarUrl.file);
    } else {
      formData.append('avatarUrl', data.avatarUrl);
    }
    const res = await userRequest.put('/user/update', formData);
    dispatch(updateUserInfoSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const updateCurrency = async (dispatch, data) => {
  try {
    const res = await userRequest.put('/user/update/currency', data);
    dispatch(updateUserCurrencySuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const logout = (dispatch) => {
  dispatch(logoutUser());
  localStorage.removeItem('token');
};
