import { Grid, IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../actions/cartActions";
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import "./Cart.css";

function Cart({ history }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const price = cartItems
    .reduce(
      (acc, item) => acc + item.qty * parseInt(item.price.replace(".", "")),
      0
    )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="cart-wrapper">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <div className="cart-title">
            <p>
              <ShoppingCartIcon /> GIỎ HÀNG
            </p>
            <p>({cartItems.length} loại sản phẩm)</p>
          </div>

          <div className="cart-items">
            {cartItems.length > 0 &&
              cartItems.map((item) => (
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
                        <QuantityPicker
                          autoUpdateCart
                          id={item.product}
                          defaultValue={parseInt(item.qty)}
                        />
                      </div>
                    </div>
                    <div className="total-price-item">
                      Tổng:{" "}
                      <span className="price">
                        {(
                          parseInt(item.price.replace(".", "")) *
                          Number(item.qty)
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        ₫
                      </span>
                    </div>
                  </div>
                  <div className="delete-icon">
                    <IconButton
                      size="small"
                      onClick={() => {
                        removeFromCartHandler(item.product);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </div>
                </div>
              ))}

            {cartItems.length === 0 && (
              <p style={{ marginTop: "20px", fontSize: "15px" }}>
                Giỏ hàng của bạn trống!
              </p>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={5}>
          <div className="order-summary">
            <div className="title">ĐƠN HÀNG</div>
            <div className="sub-title">
              {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)} sản
              phẩm
            </div>
            <div className="price">
              Tổng tiền hàng: <span>{price} ₫</span>
            </div>
            <div className="voucher">
              Mã giảm giá:
              <input type="text" placeholder="Nhập mã"></input>
            </div>
            {/* <div className="tax">Phí vận chuyển: 0 ₫</div> */}
            <div className="total-price">
              Tổng thanh toán: <span>{price} ₫</span>
            </div>
            <button
              className="checkout-btn"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Tiến hành kiểm tra
              <ArrowRightAltOutlinedIcon />
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Cart;
