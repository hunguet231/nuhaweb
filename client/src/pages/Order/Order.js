import { Breadcrumbs, Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StoreIcon from "@material-ui/icons/Store";
import Alert from "@material-ui/lab/Alert";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import HomeIcon from "@material-ui/icons/Home";
import { getOrderDetails, payOrder } from "../../actions/orderAction";
import Spinner from "../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../../constants/orderConstants";
import "./Order.css";

function Order({ match }) {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);
  const [currencyRate, setCurrencyRate] = useState(null);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    order.itemsPrice = order.orderItems
      .reduce(
        (acc, item) => acc + item.qty * parseInt(item.price.replace(".", "")),
        0
      )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  useEffect(() => {
    const getCurrencyRate = async () => {
      const { data } = await axios.get(
        "https://openexchangerates.org/api/latest.json?app_id=366e9723bbee458e9a834ade5362c352&symbols=VND"
      );

      setCurrencyRate(1 / data.rates.VND);
    };
    getCurrencyRate();
  }, []);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          color="inherit"
          to="/"
          style={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon style={{ marginRight: "5px", width: "20", height: "20" }} />
          Trang chủ
        </Link>

        <Link color="inherit" to="/myorders">
          Đơn hàng của tôi
        </Link>

        <Typography className="text-breadcrumbs" color="textPrimary">
          {order && `#${order.sku}`}
        </Typography>
      </Breadcrumbs>
      <div className="order-wrapper">
        {loading && (
          <>
            <div className="top-order">
              <div className="title">
                <StoreIcon /> CHI TIẾT ĐƠN HÀNG
              </div>
            </div>
            <Spinner />
          </>
        )}
        {!loading && order && (
          <>
            <div className="top-order">
              <div className="title">
                <StoreIcon /> CHI TIẾT ĐƠN HÀNG
              </div>
              <small>Mã đơn hàng: #{order.sku}</small>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7}>
                <div className="shipping">
                  <div className="title">Địa chỉ giao hàng</div>
                  <div className="address">
                    <p>Họ tên: {order.shippingAddress.userName}</p>
                    <p>SĐT: {order.shippingAddress.phoneNumber}</p>
                    <p>
                      Địa chỉ: {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}
                    </p>
                  </div>
                </div>
                <div className="title">
                  Trạng thái{" "}
                  {order.isDelivered ? (
                    <Alert severity="success">
                      <small>Đã giao hàng</small>
                    </Alert>
                  ) : (
                    <Alert severity="error">
                      <small>Chưa giao hàng</small>
                    </Alert>
                  )}
                </div>
                <div className="method">
                  <div className="title">Phương thức thanh toán</div>
                  <div className="payment">
                    Phương thức: {order.paymentMethod}
                  </div>
                </div>
                <div className="title">
                  Thanh toán{" "}
                  {order.isPaid ? (
                    <Alert severity="success">
                      <small>
                        Đã thanh toán vào: {order.updatedAt.substring(0, 10)}
                      </small>
                    </Alert>
                  ) : (
                    <Alert severity="error">
                      <small>Chưa thanh toán</small>
                    </Alert>
                  )}
                </div>
                <div className="items">
                  <div className="title">Sản phẩm</div>
                  {order.orderItems.map((orderItem) => (
                    <div className="cart-item" key={orderItem.product}>
                      <div
                        className="img"
                        style={{ backgroundImage: `url(${orderItem.image})` }}
                      ></div>
                      <div className="text">
                        <Link
                          to={`/products/${orderItem.slug}/${orderItem.user}`}
                        >
                          <div className="title">{orderItem.name}</div>
                        </Link>

                        <div className="sub-text">
                          <div className="price">
                            {orderItem.price} ₫ x {orderItem.qty}
                          </div>
                        </div>
                        <div className="total-price-item">
                          Tổng:{" "}
                          <span className="price">
                            {(
                              parseInt(orderItem.price.replace(".", "")) *
                              Number(orderItem.qty)
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
                    {order.orderItems.reduce(
                      (acc, item) => acc + Number(item.qty),
                      0
                    )}{" "}
                    sản phẩm
                  </div>
                  <div className="price">
                    Tổng tiền hàng: <span>{order.totalPrice} ₫</span>
                  </div>
                  <div className="voucher">Giảm giá: - 0 ₫</div>
                  <div className="tax">Phí vận chuyển: 0 ₫</div>
                  <div className="total-price">
                    Tổng thanh toán: <span>{order.itemsPrice} ₫</span>
                  </div>
                  {error && <Alert variant="danger">{error}</Alert>}

                  {!order.isPaid && (
                    <>
                      {loadingPay && <Spinner />}
                      {!sdkReady ? (
                        <Spinner />
                      ) : (
                        <PayPalButton
                          amount={(
                            order.totalPrice.replace(/[.]/g, "") * currencyRate
                          ).toFixed(2)}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </>
                  )}
                </div>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </>
  );
}

export default Order;
