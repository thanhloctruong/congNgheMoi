import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_SUCCESS,
  USER_SIGNINOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_GOOGLE_REQUEST,
  USER_SIGNIN_GOOGLE_SUCCESS,
  USER_SIGNIN_GOOGLE_FAIL,
  USER_SIGNIN_FACEBOOK_REQUEST,
  USER_SIGNIN_FACEBOOK_SUCCESS,
  USER_SIGNIN_FACEBOOK_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_SIGNINQR_REQUEST,
  USER_SIGNINQR_SUCCESS,
  USER_SIGNINQR_FAIL
} from "../constants/userConstants";
import axios from "axios";

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
export const signinQr = (token) => async (dispatch) => {
  dispatch({ type: USER_SIGNINQR_REQUEST, payload: { token } });
  try {
    const { data } = await axios.post("/api/users/signinqr", { token });
    dispatch({ type: USER_SIGNINQR_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNINQR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
export const signinGoogle = (name, email) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_GOOGLE_REQUEST, payload: { name, email } });
  try {
    const { data } = await axios.post("/api/users/signingoogle", {
      name,
      email,
      password: "123456"
    });
    dispatch({ type: USER_SIGNIN_GOOGLE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_GOOGLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
export const signinFacebook = (name, email) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_FACEBOOK_REQUEST, payload: { name, email } });
  try {
    const { data } = await axios.post("/api/users/signinfacebook", {
      name,
      email,
      password: "123456"
    });
    dispatch({ type: USER_SIGNIN_FACEBOOK_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FACEBOOK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_SIGNINOUT });
};
export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await axios.post("/api/users/register", {
      name,
      email,
      password
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo }
  } = getState();
  try {
    const { data } = await axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo }
  } = getState();
  try {
    const { data } = await axios.put(`/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
