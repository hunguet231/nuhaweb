import { Alert } from "@material-ui/lab";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderListSellerAct,
  productOrderListSellerAct,
} from "../actions/orderAction";
import OrderListSellerTable from "../components/OrderListSellerTable/OrderListSellerTable";
import Spinner from "../components/Spinner/Spinner";
import "./SellerCustomers.css";

function SellerCustomers({ history }) {
  const dispatch = useDispatch();

  // user info
  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);

  const userInfo = googleLogin.userInfo
    ? googleLogin.userInfo
    : userLogin.userInfo;

  const { loading, error, orders } = useSelector(
    (state) => state.orderListSeller
  );

  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = useSelector((state) => state.productOrderListSeller);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      dispatch(orderListSellerAct());
      dispatch(productOrderListSellerAct());
    }
  }, [dispatch, userInfo, history]);

  return (
    <div className="seller-customers-wrapper">
      <h4>Khách hàng của bạn</h4>

      <div className="myorders-wrapper">
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            {orders && orders.length > 0 && (
              <OrderListSellerTable orders={orders} />
            )}
            {orders && orders.length === 0 && (
              <p>Bạn không có đơn đặt hàng nào!</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SellerCustomers;
