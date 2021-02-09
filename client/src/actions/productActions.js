import axios from "axios";
import {
  FILTER_PRODUCTS_CATEGORY_FAIL,
  FILTER_PRODUCTS_CATEGORY_REQUEST,
  FILTER_PRODUCTS_CATEGORY_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`/api/v1/products?limit=11`);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (slug) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/products?slug=${slug}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductCreate = (
  title,
  description,
  quantity,
  prices,
  category,
  photos
) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };

    const { data } = await axios.post(
      `/api/v1/products`,
      {
        title,
        description,
        quantity,
        prices,
        category,
        photos,
      },
      config
    );

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const filterProducts = (filter) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_PRODUCTS_CATEGORY_REQUEST });

    const { data } = await axios.get(`/api/v1/products?limit=20&${filter}`);

    dispatch({ type: FILTER_PRODUCTS_CATEGORY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: FILTER_PRODUCTS_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

    const { userLogin, googleLogin } = getState();

    const userInfo = googleLogin.userInfo
      ? googleLogin.userInfo
      : userLogin.userInfo;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/v1/products/${productId}/reviews`,
      review,
      config
    );

    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
