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
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import PostAddRoundedIcon from "@material-ui/icons/PostAddRounded";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { logout } from "../../actions/userActions";
import { useGoogleLogout } from "react-google-login";

const useStyles = makeStyles({
  root: {
    border: 0,
    color: "white",
    height: 35,
  },
  label: {
    textTransform: "capitalize",
    fontSize: "12px",
  },
});

function Navbar({ history }) {
  const dispatch = useDispatch();

  // user info
  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);

  const userInfo = googleLogin.userInfo
    ? googleLogin.userInfo
    : userLogin.userInfo;

  const [anchorEl, setAnchorEl] = useState(null);
  const [keyword, setKeyword] = useState("");

  // search product
  const handleSearch = () => {};

  // logout
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    signOut();
  };

  const { signOut } = useGoogleLogout({
    clientId:
      "45790515442-clqjotokdi4k0frcbnoi36kpvqj6476v.apps.googleusercontent.com",
  });

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
            <h2>NUHA</h2>
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
          <div className="navbar-right__top">
            <Link to="/" className="option">
              <HomeOutlinedIcon />
              <Typography variant="caption"> Trang chủ</Typography>
            </Link>

            <Link to="/" className="option">
              <NotificationsNoneRoundedIcon />
              <Typography variant="caption"> Thông báo</Typography>
            </Link>

            <Link to="/help" className="option">
              <HelpOutlineRoundedIcon />
              <Typography variant="caption"> Trợ giúp</Typography>
            </Link>
          </div>

          <div className="navbar-right__bottom">
            <div className="user-wrapper">
              {userInfo ? (
                <>
                  <div className="user-inner" onClick={handleClick}>
                    <Avatar src={userInfo.user.avatarUser} />
                    <p className="user-name">{userInfo.user.firstName}</p>
                    <ArrowDropDownOutlinedIcon />
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <AccountCircleOutlinedIcon />{" "}
                      <Link to="/profile">
                        <Typography variant="subtitle2">Tài khoản</Typography>
                      </Link>
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
                    <Avatar />
                    <p className="user-name">Đăng nhập</p>
                  </Link>
                </>
              )}
            </div>
            <div className="sell-btn">
              <Link to="/me/sell/dashboard">
                <Button
                  variant="contained"
                  color="primary"
                  classes={{ root: classes.root, label: classes.label }}
                >
                  <PostAddRoundedIcon />
                  <p>Bắt đầu bán</p>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
