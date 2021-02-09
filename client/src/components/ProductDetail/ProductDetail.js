import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Grid,
  Tooltip,
  Typography,
  TextField,
  Breadcrumbs,
  Avatar,
  InputAdornment,
  Button,
} from "@material-ui/core";
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import CardTravelOutlinedIcon from "@material-ui/icons/CardTravelOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ExposureIcon from "@material-ui/icons/Exposure";
import DomainIcon from "@material-ui/icons/Domain";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LanguageIcon from "@material-ui/icons/Language";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SkeletonPrdDetail from "../skeletons/SkeletonPrdDetail";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import HomeIcon from "@material-ui/icons/Home";
import "./ProductDetail.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useSelector, useDispatch } from "react-redux";
import CarouselPrdsDetail from "../CarouselPrdsDetail";
import ReactHtmlParser from "react-html-parser";
import Axios from "axios";
import Category from "../Category/Category";
import QuantityPicker from "../QuantityPicker/QuantityPicker";
import ProductMini from "../ProductMini/ProductMini";
import Rating from "../Rating/Rating";
import Alert from "@material-ui/lab/Alert";
import { useRef } from "react";
import Toaster from "../Toaster";
import { addToCart } from "../../actions/cartActions";
import { createProductReview } from "../../actions/productActions";

const ProductDetail = ({ match, history }) => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const qtyRef = useRef(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  let {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);
  const userInfo = googleLogin.userInfo
    ? googleLogin.userInfo
    : userLogin.userInfo;

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const { data } = await Axios.get(
        `/api/v1/users/${match.params.userId}/products`
      );
      setProducts(data.data);

      setLoading(false);
    };
    fetchProducts();
  }, [productReviewCreate]);

  // get curent product
  useEffect(() => {
    if (products) {
      const product = products.find((prd) => prd.slug == match.params.slug);
      setProduct(product);
    }
  }, [products, productReviewCreate]);

  useEffect(() => {
    productReviewCreate.error = null;
  }, [productReviewCreate]);

  useEffect(() => {
    document.addEventListener("fb_init", (e) => window.FB.XFBML.parse());

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "659192831443395",
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: false, // parse social plugins on this page
        version: "v9.0",
      });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/vi_VN/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    if (window.FB) {
      window.FB.XFBML.parse();
    }
  });

  const addToCartHandler = (e) => {
    if (product) {
      dispatch(addToCart(product._id, qtyRef.current.defaultValue));
      setOpen(true);
    }
  };

  const handleOpenCart = (e) => {
    if (product) {
      dispatch(addToCart(product._id, qtyRef.current.defaultValue));
      history.push("/cart");
    }
  };

  const getRatingValue = (value) => {
    setRating(value);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    dispatch(
      createProductReview(product._id, {
        rating,
        comment,
      })
    );
  };

  const addToFavorite = () => {};

  const savePost = () => {};

  return (
    <>
      {product && (
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
              <HomeIcon
                style={{ marginRight: "5px", width: "20", height: "20" }}
              />
              Trang chủ
            </Link>

            <Link
              color="inherit"
              to={`/products?category=${product.category.category}`}
            >
              {product.category.category}
            </Link>

            <Link
              color="inherit"
              to={`/products?category=${product.category.category}`}
            >
              {product.category.subCategory}
            </Link>
            <Typography className="text-breadcrumbs" color="textPrimary">
              {product.title}
            </Typography>
          </Breadcrumbs>

          {/* Detail Section */}
          <div className="product-detail">
            <section>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CarouselPrdsDetail photos={product.photos} />
                  <div className="row">
                    <div className="save-fav">
                      {/* Favorite */}
                      <Tooltip title="Thêm vào yêu thích">
                        <div className="fav">
                          <FavoriteBorderIcon onClick={addToFavorite} />
                          <p>Thích</p>
                        </div>
                      </Tooltip>
                      {/* Bookmark */}
                      <Tooltip title="Lưu sản phẩm">
                        <div className="save">
                          <BookmarkBorderIcon onClick={savePost} />
                          <p>Lưu</p>
                        </div>
                      </Tooltip>
                    </div>
                    <div className="share">
                      <div
                        className="fb-share-button"
                        data-href={`http://localhost:3000${location.pathname}`}
                        data-layout="button_count"
                        data-size="small"
                      >
                        <a
                          target="_blank"
                          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                          className="fb-xfbml-parse-ignore"
                        >
                          Chia sẻ
                        </a>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="product-description__left">
                    <div className="title">{product.title}</div>
                    <Rating
                      readOnly
                      defaultValue={product.numRatings}
                      text={`(${product.numReviews} đánh giá)`}
                    />
                    <div className="prices">
                      {product.prices
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      ₫
                    </div>
                  </div>
                  <div className="product-description__right">
                    <Typography color="textSecondary" variant="subtitle2">
                      {/* Thông tin liên hệ: */}
                      {/* <br /> */}
                      {/* {userInfo && (
                        <> */}
                      {/* <div className="contact">
                            <div className="phone">
                              <PhoneInTalkIcon />
                              <a href={`tel:${product.user.phoneNumber}`}>
                                Gọi {product.user.phoneNumber}
                              </a>
                            </div>
                            <div className="mess">
                              <MailOutlineIcon />
                              <a href={`sms://${product.user.phoneNumber}`}>
                                Nhắn tin SMS
                              </a>
                            </div>
                          </div> */}
                      <div className="contact-more">
                        <Typography
                          className="d-flex-r "
                          color="textSecondary"
                          variant="subtitle2"
                        >
                          <DomainIcon className="mr-5 icon-detail" />
                          Nhà cung cấp:
                          <Link
                            className="supplier"
                            style={{ color: "dodgerblue" }}
                            to={`/users/${product.user._id}`}
                          >
                            {product.user.shopName}
                          </Link>
                        </Typography>
                        {/* {product.user.website && (
                              <div className="web">
                                <LanguageIcon />
                                <Typography
                                  className="d-flex-r"
                                  color="textSecondary"
                                  variant="subtitle2"
                                >
                                  Website:
                                  <a
                                    className="web-link"
                                    href={
                                      product.user.website.startsWith(
                                        "http://"
                                      ) ||
                                      product.user.website.startsWith(
                                        "https://"
                                      )
                                        ? product.user.website
                                        : "https://" + product.user.website
                                    }
                                    target="_blank"
                                  >
                                    {product.user.website}
                                  </a>
                                </Typography>
                              </div>
                            )}
                            {product.user.zalo && (
                              <div className="zalo">
                                <img src="/zalo.svg" />
                                <Typography
                                  className="d-flex-r"
                                  color="textSecondary"
                                  variant="subtitle2"
                                >
                                  Zalo:
                                  <a
                                    className="zalo-link"
                                    href={`https://zalo.me/${product.user.zalo}`}
                                    target="_blank"
                                  >
                                    Xem
                                  </a>
                                </Typography>
                              </div>
                            )}
                            {product.user.facebook && (
                              <div className="facebook">
                                <img src="/fb.svg" />
                                <Typography
                                  className="d-flex-r"
                                  color="textSecondary"
                                  variant="subtitle2"
                                >
                                  Facebook:
                                  <a
                                    className="fb-link"
                                    href={
                                      product.user.facebook.startsWith(
                                        "http://"
                                      ) ||
                                      product.user.facebook.startsWith(
                                        "https://"
                                      )
                                        ? product.user.facebook
                                        : "https://" + product.user.facebook
                                    }
                                    target="_blank"
                                  >
                                    Xem
                                  </a>
                                </Typography>
                              </div>
                            )} */}

                        <div className="address">
                          <div className="icon">
                            <LocationOnIcon className="mr-5 icon-detail" />
                          </div>
                          <div className="text">
                            <Typography color="textPrimary" variant="inherit">
                              <Typography
                                color="textSecondary"
                                variant="subtitle2"
                              >
                                Địa chỉ:
                              </Typography>{" "}
                              {product.user.address} | {product.user.city}
                            </Typography>
                            <a
                              className="map-link"
                              target="_blank"
                              href={`https://maps.google.com/?q=${product.user.address}`}
                            >
                              Xem bản đồ
                            </a>
                          </div>
                        </div>

                        <Typography
                          className="d-flex-r"
                          color="textSecondary"
                          variant="subtitle2"
                        >
                          <ExposureIcon className="mr-5 icon-detail" />
                          Số lượng có sẵn:
                          <Typography color="textPrimary" variant="inherit">
                            {" "}
                            {product.quantity}
                          </Typography>
                        </Typography>
                      </div>

                      {product.quantity === 0 && (
                        <>
                          <br />
                          <Alert severity="warning">Tạm hết hàng</Alert>
                        </>
                      )}

                      {product.quantity > 0 && (
                        <>
                          <QuantityPicker
                            defaultValue={Number(1)}
                            ref={qtyRef}
                          />

                          <div className="buy">
                            <button
                              onClick={addToCartHandler}
                              disabled={product.quantity === 0}
                              className="add-to-cart"
                            >
                              <AddShoppingCartOutlinedIcon />
                              <p>Thêm vào giỏ</p>
                            </button>

                            <button
                              onClick={handleOpenCart}
                              disabled={product.quantity === 0}
                              className="go-to-cart"
                            >
                              <CardTravelOutlinedIcon />
                              <p>Mua ngay</p>
                            </button>
                          </div>
                          <div className="row guaranteed">
                            <VerifiedUserOutlinedIcon />
                            <p>NUHA đảm bảo - Nhận hàng hoặc hoàn tiền</p>
                          </div>
                        </>
                      )}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </section>
            <section>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <Typography color="textSecondary" variant="subtitle2">
                    <Tabs>
                      <TabList>
                        <Tab>Sản phẩm</Tab>
                        <Tab>Cửa hàng</Tab>
                      </TabList>

                      <TabPanel>
                        <Typography color="textSecondary" variant="subtitle2">
                          Chi tiết sản phẩm:
                        </Typography>
                        <div className="description">
                          <Typography color="textPrimary" variant="inherit">
                            {ReactHtmlParser(product.description)}
                          </Typography>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <Typography
                          className="d-flex-r "
                          color="textSecondary"
                          variant="subtitle2"
                        >
                          Nhà cung cấp:
                          <Link
                            className="supplier"
                            style={{ color: "dodgerblue" }}
                            to={`/users/${product.user._id}`}
                          >
                            {product.user.shopName}
                          </Link>
                        </Typography>
                      </TabPanel>
                    </Tabs>
                  </Typography>

                  <Typography color="textSecondary" variant="subtitle2">
                    <br />
                    Đánh giá sản phẩm
                    <br />
                  </Typography>

                  {product.reviews.length === 0 && (
                    <Alert icon={false} severity="info">
                      Chưa có đánh giá nào
                    </Alert>
                  )}

                  {product.reviews.map((rv) => (
                    <div key={rv._id} className="rv-item">
                      <Link to={`/users/${rv.user}`} className="name">
                        <Avatar src={rv.userAvatar} />
                        <p> {rv.name}</p>
                      </Link>
                      <Rating readOnly size="small" defaultValue={rv.rating} />
                      <p className="time">
                        {rv.createdAt.substring(0, 10)}{" "}
                        {rv.createdAt.substring(11, 19)}
                      </p>
                      <p className="cmt">{rv.comment}</p>
                    </div>
                  ))}

                  <Typography color="textSecondary" variant="subtitle2">
                    <br />
                    Để lại đánh giá của bạn
                    <br />
                  </Typography>

                  {errorProductReview && (
                    <Alert severity="error">{errorProductReview}</Alert>
                  )}

                  {userInfo && (
                    <>
                      <form onSubmit={handleSubmitReview}>
                        <Rating getRatingValue={getRatingValue}></Rating>
                        <TextField
                          placeholder="Viết nhận xét ở đây..."
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          multiline
                          rows={2}
                          className="comment-box"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment
                                className="avt-cmt-box"
                                position="start"
                              >
                                <Avatar src={userInfo.user.avatarUser} />
                                <p>{userInfo.user.firstName}</p>
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <Button
                                  type="submit"
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                >
                                  Gửi
                                </Button>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </form>
                    </>
                  )}

                  {!userInfo && (
                    <Alert icon={false} severity="info">
                      <Link to="/login">
                        <b>Đăng nhập</b> để viết đánh giá
                      </Link>
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography color="textSecondary" variant="subtitle2">
                    Sản phẩm khác của shop:
                  </Typography>
                  {products
                    .filter((prd) => prd._id != product._id)
                    .slice(0, 5)
                    .map((product, index) => (
                      <Grid key={index} item xs={12}>
                        <a
                          href={`/products/${product.slug}/${product.user._id}`}
                        >
                          <ProductMini product={product} />
                        </a>
                      </Grid>
                    ))}

                  <a href="#" className="link-view-more">
                    <span>Xem tất cả</span>
                    <ArrowForwardIosRoundedIcon />
                  </a>
                </Grid>
              </Grid>
            </section>
          </div>
        </>
      )}
      {open && <Toaster msg={`Đã thêm vào giỏ`} />}
      {loading && <SkeletonPrdDetail />}
    </>
  );
};

export default ProductDetail;
