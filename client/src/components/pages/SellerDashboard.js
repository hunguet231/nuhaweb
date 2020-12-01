import { CircularProgress, Grid } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
        <h4>Tổng quan</h4>
        <div className="boxes">
          <a href="/me/sell/products">
            <div className="box product">
              <p>Sản phẩm</p>
              <p className="num">
                {loading && <CircularProgress color="inherit" size={20} />}
                {!loading && <>{countPrds}</>}
              </p>
            </div>
          </a>
          <div className="box customer">
            <p>Khách hàng</p>
            <p className="num">N/A</p>
          </div>
          <div className="box view">
            <p>Lượt xem shop</p>
            <p className="num">N/A</p>
          </div>
          <div className="box fav">
            <p>Yêu thích</p>
            <p className="num">N/A</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
