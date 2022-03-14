import { loginFailure, loginStart, loginSuccess, logoutUser, signupStart, signupSuccess, signupFailure, accountInfoStart, accountInfoSuccess, accountInfoFailure } from "./userRedux";
import { publicRequest } from "../api/http";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const signup = async (dispatch, user) => {
  dispatch(signupStart());
  try {
    const res = await publicRequest.post("/signup", user);
    dispatch(signupSuccess(res.data));
  } catch (err) {
    dispatch(signupFailure());
  }
};

export const accountInfo = async (dispatch, user) => {
  dispatch(accountInfoStart());
  try {
    const res = await publicRequest.post("/user", { email: user.email});
    dispatch(accountInfoSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(accountInfoFailure());
  }
};


export const logout = (dispatch) => {
  dispatch(logoutUser());
};