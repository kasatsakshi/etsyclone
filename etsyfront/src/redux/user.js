import { loginFailure, loginStart, loginSuccess, logoutUser, signupStart, signupSuccess, signupFailure } from "./userRedux";
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

export const logout = (dispatch) => {
  dispatch(logoutUser());
};