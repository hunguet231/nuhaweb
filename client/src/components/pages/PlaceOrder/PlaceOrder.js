import { Button, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../../CheckoutStep/CheckoutStep";
import StoreIcon from "@material-ui/icons/Store";
import { Alert } from "@material-ui/lab";
import "./PlaceOrder.css";
import { createOrder } from "../../../actions/orderAction";
import { Link } from "react-router-dom";

function PlaceOrder({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const dispatch = useDispatch();

  const price = cartItems
    .reduce(
      (acc, item) => acc + item.qty * parseInt(item.price.replace(".", "")),
      0
    )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  cart.itemsPrice = price;
  cart.shippingPrice = 0;
  const total =
    parseInt(price.replace(/[.]/g, "")) +
    parseInt(cart.shippingPrice.toString().replace(/[.]/g, ""));
  cart.totalPrice = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const sellerIds = cartItems.map((productItem) => productItem.user);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);

  const placeorderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        sellerIds,
      })
    );
  };

  return (
    <div className="place-order-wrapper">
      <CheckoutStep step={2} />
      <div className="top-order">
        <div className="title">
          <StoreIcon /> ĐẶT HÀNG
        </div>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <div className="shipping">
            <div className="title">Địa chỉ giao hàng</div>
            <div className="address">
              <p>Họ tên: {shippingAddress.userName}</p>
              <p>SĐT: {shippingAddress.phoneNumber}</p>
              <p>
                Địa chỉ: {shippingAddress.address}, {shippingAddress.city}
              </p>
            </div>
          </div>
          <div className="method">
            <div className="title">Phương thức thanh toán</div>
            <div className="payment">Phương thức: {paymentMethod}</div>
          </div>
          <div className="items">
            <div className="title">Sản phẩm</div>
            {cartItems.map((cartItem) => (
              <div className="cart-item" key={cartItem.product}>
                <div
                  className="img"
                  style={{ backgroundImage: `url(${cartItem.image})` }}
                ></div>
                <div className="text">
                  <Link to={`/products/${cartItem.slug}/${cartItem.user}`}>
                    <div className="title">{cartItem.name}</div>
                  </Link>

                  <div className="sub-text">
                    <div className="price">
                      {cartItem.price} ₫ x {cartItem.qty}
                    </div>
                  </div>
                  <div className="total-price-item">
                    Tổng:{" "}
                    <span className="price">
                      {(
                        parseInt(cartItem.price.replace(".", "")) *
                        Number(cartItem.qty)
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      ₫
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
            <div className="voucher">Giảm giá: - 0 ₫</div>
            <div className="tax">Phí vận chuyển: 0 ₫</div>
            <div className="total-price">
              Tổng thanh toán: <span>{price} ₫</span>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button
              disabled={cartItems.length === 0}
              onClick={placeorderHandler}
              style={{ marginTop: "10px" }}
              variant="contained"
              color="secondary"
            >
              Đặt hàng
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default PlaceOrder;
