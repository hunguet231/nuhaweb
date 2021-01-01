import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Avatar, Badge, CircularProgress, Typography } from "@material-ui/core";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import EditIcon from "@material-ui/icons/Edit";
import "./SellerDashboard.css";

function SellerDashboard() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { firstName, lastName, _id } = userInfo.user;
  const [loading, setLoading] = useState(false);
  const [countPrds, setCountPrds] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await Axios.get(`/api/v1/users/${_id}/products`);
      setCountPrds(data.count);
      setLoading(false);
    };
    fetchProducts();
  }, []);

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
        <img src="/ecommerce-banner.svg" />
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
            <Avatar alt="Shop Avatar" src={userInfo.user.avatarShop} />
          </Badge>
          <Typography variant="body2">{userInfo.user.shopName}</Typography>
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
          <div className="box customer">
            <SupervisedUserCircleIcon />
            <p>Khách hàng</p>
            <p className="num">N/A</p>
          </div>
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
      </div>
    </div>
  );
}

export default SellerDashboard;
