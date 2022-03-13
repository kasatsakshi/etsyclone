import { loginFailure, loginStart, loginSuccess, logoutUser } from "./userRedux";
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

export const logout = (dispatch) => {
  dispatch(logoutUser());
};