import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);
  const product = data.data;
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: product._id,
      slug: product.slug,
      user: product.user._id,
      name: product.title,
      image: product.photos[0],
      price: product.prices,
      countInStock: product.quantity,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
