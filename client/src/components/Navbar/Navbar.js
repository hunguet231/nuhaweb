import React from "react";
import { IconButton, Button, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import PostAddRoundedIcon from "@material-ui/icons/PostAddRounded";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { makeStyles } from "@material-ui/core/styles";
import "./Navbar.css";
import logo from "./logo.PNG";

const useStyles = makeStyles({
  root: {
    background: "#1247a0",
    border: 0,
    color: "white",
    height: 35,
    padding: "0 22px",
    boxShadow: "0 1px 2px #7CC0FF",
  },
  label: {
    textTransform: "capitalize",
  },
});

function Navbar() {
  const classes = useStyles();
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <div className="navbar-top">
          {/* <a href="#">
            <img src={logo} alt="Logo" className="logo" />
          </a> */}
          <h1 style={{ color: "white" }}>NUHA</h1>
          <div className="navbar-top__option">
            <div className="option">
              <SmsOutlinedIcon />
              <Typography variant="caption"> Chat</Typography>
            </div>
            <div className="option">
              <NotificationsNoneRoundedIcon />
              <Typography variant="caption"> Thông báo</Typography>
            </div>
            <div className="option">
              <HelpOutlineRoundedIcon />
              <Typography variant="caption"> Trợ giúp</Typography>
            </div>
          </div>
        </div>
        <div className="navbar-bottom">
          <div className="search-box">
            <input type="search" placeholder="Tìm kiếm sản phẩm, shop..." />
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
          </div>

          <div className="navbar-bottom__info">
            {/* <Button
              variant="contained"
              classes={{ root: classes.root, label: classes.label }}
            >
              <PostAddRoundedIcon />
              Bắt đầu bán
            </Button> */}
            <div className="option">
              <PersonAddOutlinedIcon />
              <Typography variant="caption"> Đăng nhập</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
