import { Button, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StoreIcon from "@material-ui/icons/Store";
import Alert from "@material-ui/lab/Alert";
import "./Order.css";
import { getOrderDetails } from "../../../actions/orderAction";

function Order({ match }) {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderCreate = useSelector((state) => state.orderCreate);

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
    dispatch(getOrderDetails(orderId));

    // empty order create
    orderCreate.order = {};
    orderCreate.success = false;
  }, [dispatch]);

  return (
    <div className="order-wrapper">
      {loading && <p>Đang tải...</p>}
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
                    <small>Đã thanh toán</small>
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
                      <a href={`/products/${orderItem.slug}/${orderItem.user}`}>
                        <div className="title">{orderItem.name}</div>
                      </a>

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
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}

export default Order;
