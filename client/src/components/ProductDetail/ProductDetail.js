import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Grid,
  Tooltip,
  Typography,
  TextField,
  Button,
  Breadcrumbs,
} from "@material-ui/core";
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
import { useSelector, useDispatch } from "react-redux";
import CarouselPrdsDetail from "../CarouselPrdsDetail";
import ReactHtmlParser from "react-html-parser";
import { listProducts } from "../../actions/productActions";
import Axios from "axios";
import Category from "../Category/Category";
import ProductMini from "../ProductMini/ProductMini";

const ProductDetail = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);

  const userInfo = googleLogin.userInfo
    ? googleLogin.userInfo
    : userLogin.userInfo;

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const fetchProducts = async () => {
      setLoading(true);

      const { data } = await Axios.get(
        `/api/v1/users/${match.params.userId}/products`
      );
      setProducts(data.data);

      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products) {
      const product = products.find((prd) => prd.slug == match.params.slug);
      setProduct(product);
    }
  }, [products]);

  useEffect(() => {
    document.addEventListener("fb_init", (e) => window.FB.XFBML.parse());
  }, []);

  useEffect(() => {
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
                <Grid item xs={12} sm={8}>
                  <CarouselPrdsDetail photos={product.photos} />
                  <div className="product-description">
                    <div className="title">{product.title}</div>
                    {/* <Rating
                    value={numRatings}
                    text={`(${numReviews} đánh giá)`}
                    id={_id}
                  /> */}
                    <div className="prices" style={{ color: " #e74c3c" }}>
                      {product.prices
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      ₫
                    </div>
                    <div className="save-fav">
                      {/* Favorite */}
                      <Tooltip title="Thêm vào yêu thích">
                        <FavoriteBorderIcon onClick={addToFavorite} />
                      </Tooltip>
                      {/* Bookmark */}
                      <Tooltip title="Lưu sản phẩm">
                        <BookmarkBorderIcon onClick={savePost} />
                      </Tooltip>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div>
                    <Typography color="textSecondary" variant="subtitle2">
                      {/* Thông tin liên hệ: */}
                      {/* <br /> */}
                      {userInfo && (
                        <>
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
                                <Typography
                                  color="textPrimary"
                                  variant="inherit"
                                >
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
                              Số lượng có sẵn:{" "}
                              <Typography color="textPrimary" variant="inherit">
                                {product.quantity}
                              </Typography>
                            </Typography>
                          </div>

                          <div className="add-to-cart">
                            <AddShoppingCartOutlinedIcon />
                            <p>Thêm vào giỏ hàng</p>
                          </div>
                        </>
                      )}
                      {!userInfo && (
                        <>
                          <Link style={{ color: "dodgerblue" }} to="/login">
                            Đăng nhập
                          </Link>{" "}
                          để xem
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
                    Chi tiết sản phẩm:
                  </Typography>
                  <div className="description">
                    <Typography color="textPrimary" variant="inherit">
                      {ReactHtmlParser(product.description)}
                    </Typography>
                  </div>
                  <Typography color="textSecondary" variant="subtitle2">
                    <br />
                    Chia sẻ bài viết:
                  </Typography>

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

                  <Typography color="textSecondary" variant="subtitle2">
                    <br />
                    Bình luận công khai:
                  </Typography>

                  <div
                    className="fb-comments"
                    data-href={`http://localhost:3000${location.pathname}`}
                    data-numposts="5"
                    data-lazy="true"
                    data-width="100%"
                  ></div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography color="textSecondary" variant="subtitle2">
                    Sản phẩm khác của shop:
                  </Typography>
                  {products
                    .filter((prd) => prd._id != product._id)
                    .slice(0, 5)
                    .map((product, index) => (
                      <Grid item xs={12}>
                        <a
                          href={`/products/${product.slug}/${product.user._id}`}
                        >
                          <ProductMini key={index} product={product} />
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
            {/* Comment */}
            {/* <Typography color="textSecondary" variant="subtitle2">
                  <br />
                  Để lại đánh giá của bạn:
                  <br />
                </Typography>
                <AccountCircle />
                <TextField fullWidth label={"Hung Nguyen"} /> */}
            {/* <Typography color="textSecondary" variant="subtitle2">
                  <br />
                  Tất cả đánh giá:
                  <Link to={`/products/${slug}/reviews`}> Xem tất cả</Link>
                </Typography> */}
          </div>
        </>
      )}
      {loading && <SkeletonPrdDetail />}
    </>
  );
};

export default ProductDetail;
