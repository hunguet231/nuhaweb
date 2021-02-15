import { Alert } from "@material-ui/lab";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrder } from "../../actions/orderAction";
import OrderListTable from "../../components/OrderListTable/OrderListTable";
import Spinner from "../../components/Spinner/Spinner";
import "./MyOrders.css";

function MyOrders({ history }) {
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const dispatch = useDispatch();

  // user info
  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);

  const userInfo = googleLogin.userInfo
    ? googleLogin.userInfo
    : userLogin.userInfo;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listMyOrder());
    }
  }, [dispatch, history, userInfo]);

  return (
    <div className="myorders-wrapper">
      {loadingOrders ? (
        <Spinner />
      ) : errorOrders ? (
        <Alert severity="error">{errorOrders}</Alert>
      ) : (
        <>
          {orders.length > 0 && <OrderListTable orders={orders} />}
          {orders.length === 0 && (
            <p>Bạn không có đơn hàng nào, hãy mua thứ gì đó!</p>
          )}
        </>
      )}
    </div>
  );
}

export default MyOrders;
