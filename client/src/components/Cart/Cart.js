import { Grid, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import "./Cart.css";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const removeFromCartHandler = () => {};

  return (
    <div className="cart-wrapper">
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <div className="cart-title">
            <p>Giỏ hàng của bạn</p>
            <p>({cartItems.length} sản phẩm)</p>
          </div>

          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.product}>
                <div
                  className="img"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="text">
                  <a href={`/products/${item.slug}/${item.user}`}>
                    <div className="title">{item.name}</div>
                  </a>

                  <div className="sub-text">
                    <div className="price">{item.price} ₫</div>
                    <div className="qty">
                      <QuantityPicker qty={item.qty} />
                    </div>
                  </div>
                </div>
                <div className="delete-icon">
                  <IconButton
                    size="small"
                    onClick={removeFromCartHandler(item.product)}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={5}></Grid>
      </Grid>
    </div>
  );
}

export default Cart;
