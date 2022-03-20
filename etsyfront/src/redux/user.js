import { loginFailure, loginStart, loginSuccess, logoutUser, signupStart, signupSuccess, signupFailure, accountInfoStart, accountInfoSuccess, accountInfoFailure, updateUserInfoSuccess } from "./userRedux";
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

export const updateUserInfo = async (dispatch, data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("email", data.email);
    formData.append("address1", data.address1);
    formData.append("address2",data.address2);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country", data.country);
    formData.append("zipcode", data.zipcode);
    formData.append("bio", data.bio);
    formData.append("phone", data.phone);
    if(data.avatarUrl.file) {
      formData.append("avatarUrl", data.avatarUrl.file);
    } else {
      formData.append("avatarUrl", data.avatarUrl);
    }
    formData.append("userId", data.userId)
    const res = await publicRequest.post("/user/update", formData);
    dispatch(updateUserInfoSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};


export const logout = (dispatch) => {
  dispatch(logoutUser());
};