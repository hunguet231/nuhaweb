import { Avatar, Badge, CircularProgress, Typography } from "@material-ui/core";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import AmpStoriesIcon from "@material-ui/icons/AmpStories";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderListSellerAct } from "../actions/orderAction";
import "./SellerDashboard.css";

function SellerDashboard() {
  const dispatch = useDispatch();

  // user info
  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);

  const userInfo = googleLogin.userInfo
    ? googleLogin.userInfo
    : userLogin.userInfo;

  const { firstName, lastName, _id } = userInfo.user;

  const {
    loading: orderListSellerLoading,
    error: orderListSellerError,
    orders,
  } = useSelector((state) => state.orderListSeller);

  const [loading, setLoading] = useState(false);
  const [countPrds, setCountPrds] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await Axios.get(`/api/v1/users/${_id}/products`);
      setCountPrds(data.count);
      setLoading(false);
    };
    fetchProducts();

    // fetch cusomers
    dispatch(orderListSellerAct());
  }, [dispatch, _id]);

  return (
    <div className="dashboard">
      <div className="banner">
        <div className="text">
          <h4>
            Chào mừng{" "}
            <span>
              {firstName} {lastName}
            </span>
          </h4>
          <p>
            Quản lý và theo dõi việc buôn bán của bạn một cách dễ dàng hơn bao
            giờ hết!
            <br />
            Nhấn vào mục Sản phẩm để bắt đầu đăng sản phẩm, mục Khách hàng để
            quản lý
            <br />
            khách hàng của bạn.
          </p>
        </div>
        <img src="/ecommerce-banner.svg" alt="" />
      </div>

      <div className="over-view">
        <h4>
          Tổng quan <Link to="/me/update-level">Nâng cấp shop</Link>
        </h4>

        {/* Shop Info */}
        <div className="shop-info">
          <Badge
            badgeContent={userInfo.user.shopLevel || "Error"}
            color="primary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar alt="Shop Avatar" src={userInfo.user.avatarUser} />
          </Badge>
          <Typography variant="body2">
            Shop: {userInfo.user.shopName}
          </Typography>
        </div>

        {/* Boxes */}
        <div className="boxes">
          <a href="/me/sell/products">
            <div className="box product">
              <AllInboxIcon />
              <p>Sản phẩm</p>
              <div className="num">
                {loading && <CircularProgress color="inherit" size={20} />}
                {!loading && <>{countPrds}</>}
              </div>
            </div>
          </a>
          <a href="/me/sell/customers">
            <div className="box customer">
              <SupervisedUserCircleIcon />
              <p>Khách hàng</p>
              <p className="num">
                {orderListSellerLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <>
                    {orders && new Set(orders.map((order) => order.user)).size}
                  </>
                )}
              </p>
            </div>
          </a>
          <a href="/me/sell/customers">
            <div className="box order">
              <AmpStoriesIcon />
              <p>Đơn mua</p>
              <p className="num">
                {orderListSellerLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <>{orders && orders.length}</>
                )}
              </p>
            </div>
          </a>
          <div className="box view">
            <VisibilityIcon />
            <p>Lượt xem shop</p>
            <p className="num">N/A</p>
          </div>
          <div className="box fav">
            <FavoriteBorderIcon />
            <p>Yêu thích</p>
            <p className="num">N/A</p>
          </div>
        </div>
      </div>

      {/* Shop Detail */}
      <div className="detail">
        <h4>
          Chi tiết <Link to="/me/update-shop">Chỉnh sửa</Link>
        </h4>
        <p>Tên shop: {userInfo.user.shopName}</p>
        <p>SĐT: {userInfo.user.phoneNumber}</p>
        <p>Địa chỉ: {userInfo.user.address}</p>
        <p>Thành phố: {userInfo.user.city}</p>
        <p>Số lượt đánh giá: {userInfo.user.numReviews}</p>
        <p>
          Số lượt yêu thích:{" "}
          {userInfo.user.lovedBy ? userInfo.user.lovedBy : "0"}
        </p>
        {userInfo.user.zalo && <p>Zalo: {userInfo.user.zalo} </p>}
        {userInfo.user.facebook && <p>Facebook: {userInfo.user.facebook} </p>}
        {userInfo.user.website && <p>Website: {userInfo.user.website} </p>}
      </div>
    </div>
  );
}

export default SellerDashboard;
