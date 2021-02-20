import React, { useEffect, useState } from "react";
import { Tabs, Tab, Breadcrumbs, Typography } from "@material-ui/core";
import SellerProducts from "./SellerProducts";
import SellerCustomers from "./SellerCustomers";
import SellerDashboard from "./SellerDashboard";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AllInboxOutlinedIcon from "@material-ui/icons/AllInboxOutlined";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import HomeIcon from "@material-ui/icons/Home";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import "./TabsSeller.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function TabsSeller({ match, history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = "/me/update-shop";

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo")).user.isSeller) {
      history.push(redirect);
    }
  }, [userInfo, history]);

  const page = match.params.page;

  const tabNameToIndex = {
    0: "dashboard",
    1: "products",
    2: "customers",
  };

  const indexToTabName = {
    dashboard: 0,
    products: 1,
    customers: 2,
  };

  const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);

  const handleChange = (event, newValue) => {
    history.push(`/me/sell/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
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

        <Typography className="text-breadcrumbs" color="textPrimary">
          Khu vực bán
        </Typography>
      </Breadcrumbs>
      <div className="tabs-seller">
        <div className="tabs">
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab icon={<DashboardIcon />} label="Dashboard" />
            <Tab icon={<AllInboxOutlinedIcon />} label="Sản phẩm" />
            <Tab icon={<PeopleOutlineIcon />} label="Khách hàng" />
          </Tabs>
        </div>
        <div className="component">
          {selectedTab === 0 && <SellerDashboard />}
          {selectedTab === 1 && <SellerProducts />}
          {selectedTab === 2 && <SellerCustomers />}
        </div>
      </div>
    </>
  );
}

export default TabsSeller;
