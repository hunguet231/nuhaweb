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
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import PostAddRoundedIcon from "@material-ui/icons/PostAddRounded";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

function Navbar({ history }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // user info
  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);

  const userInfo = googleLogin.userInfo
    ? googleLogin.userInfo
    : userLogin.userInfo;

  const [anchorUser, setAnchorUser] = useState(null);
  const [anchorCart, setAnchorCart] = useState(null);
  const [keyword, setKeyword] = useState("");

  const qty = cartItems.length;
  const prices = cartItems
    .reduce(
      (acc, item) => acc + item.qty * parseInt(item.price.replace(".", "")),
      0
    )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // search product
  const handleSearch = () => {};

  // logout
  const handleLogout = () => {
    setAnchorUser(null);
    dispatch(logout());
    signOut();
  };

  const { signOut } = useGoogleLogout({
    clientId:
      "45790515442-clqjotokdi4k0frcbnoi36kpvqj6476v.apps.googleusercontent.com",
  });

  // menu
  const handleClickUser = (event) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorUser(null);
  };

  const handleClickCart = (event) => {
    setAnchorCart(event.currentTarget);
  };

  const handleCloseCart = () => {
    setAnchorCart(null);
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
                  <div className="user-inner" onClick={handleClickUser}>
                    <Avatar src={userInfo.user.avatarUser} />
                    <p className="user-name">{userInfo.user.firstName}</p>
                    <ArrowDropDownOutlinedIcon />
                  </div>
                  <Menu
                    anchorEl={anchorUser}
                    keepMounted
                    open={Boolean(anchorUser)}
                    onClose={handleCloseUser}
                  >
                    <MenuItem>
                      <div className="user-inner">
                        <Avatar src={userInfo.user.avatarUser} />
                        <p className="user-name">{userInfo.user.firstName}</p>
                      </div>
                    </MenuItem>
                    <hr></hr>
                    <MenuItem onClick={handleCloseUser}>
                      <AccountCircleOutlinedIcon />{" "}
                      <Link to="/profile">
                        <Typography variant="subtitle2">Tài khoản</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUser}>
                      <ReceiptOutlinedIcon />{" "}
                      <Link to="/myorders">
                        <Typography variant="subtitle2">Đơn mua</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUser}>
                      <StorefrontOutlinedIcon />{" "}
                      <Link to="/me/sell/dashboard">
                        <Typography variant="subtitle2">Bắt đầu bán</Typography>
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
            <div className="cart" onClick={handleClickCart}>
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={qty} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </div>
            <Menu
              className="cart-modal"
              anchorEl={anchorCart}
              keepMounted
              open={Boolean(anchorCart)}
              onClose={handleCloseCart}
            >
              <MenuItem className="cart-modal-title">
                <div className="title-left">
                  <StyledBadge badgeContent={qty} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                  <p>Giỏ hàng</p>
                </div>
                <div className="title-right">
                  <p>
                    Tổng: <span className="prices">{prices} ₫</span>
                  </p>
                </div>
              </MenuItem>
              <hr />
              <MenuItem className="cart-modal-body">
                {qty === 0 && <p>Giỏ hàng trống!</p>}
                {qty > 0 && (
                  <>
                    {cartItems.map((item) => (
                      <MenuItem
                        key={item.product}
                        className="product-cart-item"
                      >
                        <div
                          className="img"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="text">
                          <a href={`/products/${item.slug}/${item.user}`}>
                            <div className="title">{item.name}</div>
                          </a>

                          <div className="sub-text">
                            <div className="price">{item.price} ₫</div>
                            <div className="qty">SL: {item.qty}</div>
                          </div>
                        </div>
                      </MenuItem>
                    ))}
                  </>
                )}
              </MenuItem>
              <MenuItem className="cart-modal-footer">
                <Link to={`/cart`} onClick={handleCloseCart}>
                  <button>Xem giỏ</button>
                </Link>
              </MenuItem>
            </Menu>

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
