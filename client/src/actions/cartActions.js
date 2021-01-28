import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (slug, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/?slug=${slug}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.slug,
      name: data.title,
      image: data.photo[0],
      price: data.prices,
      countInStock: data.quantity,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
