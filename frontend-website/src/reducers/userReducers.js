import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNINOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNIN_GOOGLE_REQUEST,
  USER_SIGNIN_GOOGLE_SUCCESS,
  USER_SIGNIN_GOOGLE_FAIL,
  USER_SIGNIN_FACEBOOK_REQUEST,
  USER_SIGNIN_FACEBOOK_SUCCESS,
  USER_SIGNIN_FACEBOOK_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_SIGNINQR_REQUEST,
  USER_SIGNINQR_SUCCESS,
  USER_SIGNINQR_FAIL,
  USER_SIGNINQR_RESET
} from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: true, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNINOUT:
      return {};
    default:
      return state;
  }
};
export const userSigninQRReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNINQR_REQUEST:
      return { loading: true };
    case USER_SIGNINQR_SUCCESS:
      return { loading: true, userInfo: action.payload };
    case USER_SIGNINQR_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNINQR_RESET:
      return {};
    default:
      return state;
  }
};
export const userSigninGoogleReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_GOOGLE_REQUEST:
      // console.log(action.payload);
      return { loading: true };
    case USER_SIGNIN_GOOGLE_SUCCESS:
      return { loading: true, userInfo: action.payload };
    case USER_SIGNIN_GOOGLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userSigninFacebookReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_FACEBOOK_REQUEST:
      // console.log(action.payload);
      return { loading: true };
    case USER_SIGNIN_FACEBOOK_SUCCESS:
      return { loading: true, userInfo: action.payload };
    case USER_SIGNIN_FACEBOOK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: true, userInfo: action.payload };
    case USER_REGISTER_FAIL:
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
