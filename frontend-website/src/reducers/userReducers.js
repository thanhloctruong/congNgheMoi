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
  USER_SIGNIN_FACEBOOK_FAIL
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

