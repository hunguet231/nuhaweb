import {
  GOOGLE_LOGIN_FAIL,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGOUT,
  UPDATE_SHOP_FAIL,
  UPDATE_SHOP_REQUEST,
  UPDATE_SHOP_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const googleLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case GOOGLE_LOGIN_REQUEST:
      return { loading: true };
    case GOOGLE_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case GOOGLE_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case GOOGLE_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateShopReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SHOP_REQUEST:
      return { loading: true };
    case UPDATE_SHOP_SUCCESS:
      return { loading: false, shopInfo: action.payload };
    case UPDATE_SHOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
