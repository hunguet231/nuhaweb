import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  filterProductsCategoryReducer,
} from "./reducers/productReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  googleLoginReducer,
  updateShopReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  filteredProducts: filterProductsCategoryReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  googleLogin: googleLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  updateShop: updateShopReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
