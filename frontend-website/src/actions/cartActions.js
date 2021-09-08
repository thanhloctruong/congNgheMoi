import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/product/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.img,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeCart = productId => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};