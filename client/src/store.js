import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  filterProductsCategoryReducer,
  productReviewCreateReducer,
} from "./reducers/productReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  googleLoginReducer,
  updateShopReducer,
  userDetailsReducer,
  userListReducer,
  userDeleteReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderPayReducer,
  orderListSellerReducer,
  productOrderListSellerReducer,
} from "./reducers/orderReducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  filteredProducts: filterProductsCategoryReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productReviewCreateReducer,
  productCreate: productCreateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  googleLogin: googleLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  updateShop: updateShopReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderListSeller: orderListSellerReducer,
  productOrderListSeller: productOrderListSellerReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : [];

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : [];

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
