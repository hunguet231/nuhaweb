import React from "react";
import { IconButton, Button, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SmsRoundedIcon from "@material-ui/icons/SmsRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import PostAddRoundedIcon from "@material-ui/icons/PostAddRounded";
import { makeStyles } from "@material-ui/core/styles";
import "./Navbar.css";
import logo from "./logo.PNG";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient( 135deg, #72EDF2 10%, #5151E5 100%)",
    border: 0,
    color: "white",
    height: 35,
    padding: "0 30px",
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
          <a href="#">
            <img src={logo} alt="Logo" className="logo" />
          </a>
          <div className="navbar-top__option">
            <div className="option">
              <Button classes={{ label: classes.label }}>
                <SmsRoundedIcon />
                <Typography variant="caption"> Chat</Typography>
              </Button>
            </div>
            <div className="option">
              <Button classes={{ label: classes.label }}>
                <NotificationsRoundedIcon />
                <Typography variant="caption"> Thông báo</Typography>
              </Button>
            </div>
            <div className="option">
              <Button classes={{ label: classes.label }}>
                <HelpOutlineRoundedIcon />
                <Typography variant="caption"> Trợ giúp</Typography>
              </Button>
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
            <Button
              variant="contained"
              classes={{ root: classes.root, label: classes.label }}
            >
              <PostAddRoundedIcon />
              Bắt đầu bán
            </Button>
            <Button classes={{ label: classes.label }}>
              <Typography variant="caption"> Đăng nhập / Đăng ký</Typography>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
