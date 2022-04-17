import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    signupStart: (state) => {
      state.isFetching = true;
    },
    signupSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    signupFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    accountInfoStart: (state) => {
      state.isFetching = true;
    },
    accountInfoSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    accountInfoFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateUserInfoSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    updateUserCurrencySuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    logoutUser(state, action) {
      // Note that this should be left intentionally empty.
    },
  },
});

export const {
  loginStart, loginSuccess, loginFailure, logoutUser, signupStart, signupSuccess, signupFailure, accountInfoStart, accountInfoSuccess, accountInfoFailure, updateUserInfoSuccess, updateUserCurrencySuccess,
} = userSlice.actions;
export default userSlice.reducer;
