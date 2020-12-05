import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  Button,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Badge,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import PostAddRoundedIcon from "@material-ui/icons/PostAddRounded";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { logout } from "../../actions/userActions";

const useStyles = makeStyles({
  root: {
    background: "#6c5ce7",
    border: 0,
    color: "white",
    height: 35,
    boxShadow: "0 1px 2px #7CC0FF",
  },
  label: {
    textTransform: "capitalize",
  },
});

function Navbar({ history }) {
  const dispatch = useDispatch();

  // user info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [anchorEl, setAnchorEl] = useState(null);
  const [keyword, setKeyword] = useState("");

  // search product
  const handleSearch = () => {
    if (keyword.trim()) {
      history.push(`/search?q=${keyword}`);
    } else {
      history.push("/");
    }
  };

  // logout
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  // menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <div className="navbar-left">
          <Link to="/">
            <h2>BABU</h2>
          </Link>
          <div className="search-box">
            <input
              type="text"
              name="q"
              placeholder="Tìm kiếm sản phẩm, shop..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <IconButton size="small" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        <div className="navbar-right">
          <input type="checkbox" id="nav-toggle" />
          <label htmlFor="nav-toggle" className="icon-burger">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </label>

          <div className="navbar-right__top">
            <Link to="/" className="option">
              <HomeOutlinedIcon />
              <Typography variant="caption"> Trang chủ</Typography>
            </Link>

            <Link to="/" className="option">
              <NotificationsNoneRoundedIcon />
              <Typography variant="caption"> Thông báo</Typography>
            </Link>

            <Link to="/" className="option">
              <HelpOutlineRoundedIcon />
              <Typography variant="caption"> Trợ giúp</Typography>
            </Link>
          </div>

          <div className="navbar-right__bottom">
            <div className="sell-btn">
              <Link to="/me/sell/dashboard">
                <Button
                  variant="contained"
                  classes={{ root: classes.root, label: classes.label }}
                >
                  <PostAddRoundedIcon />
                  <p>Bắt đầu bán</p>
                </Button>
              </Link>
            </div>
            <div className="user">
              {userInfo ? (
                <>
                  <p onClick={handleClick}>{userInfo.user.firstName}</p>
                  <KeyboardArrowDownIcon />
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <AccountCircleIcon />{" "}
                      <Typography variant="subtitle2">Tài khoản</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ExitToAppIcon />{" "}
                      <Typography variant="subtitle2">Đăng xuất</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Link to="/login" className="option">
                    <AccountCircleIcon />
                    <Typography variant="caption">Đăng nhập</Typography>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
