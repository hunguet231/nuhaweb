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
import FavoriteIcon from "@material-ui/icons/Favorite";
import LanguageIcon from "@material-ui/icons/Language";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SkeletonPrdDetail from "../skeletons/SkeletonPrdDetail";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import HomeIcon from "@material-ui/icons/Home";
import "./ProductDetail.css";
import { useSelector, useDispatch } from "react-redux";
import CarouselPrdsDetail from "../CarouselPrdsDetail";
import ReactHtmlParser from "react-html-parser";
import { listProducts } from "../../actions/productActions";
import Axios from "axios";
import Product from "../Product/Product";
import Category from "../Category/Category";

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [copySucess, setCopySuccess] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, products } = productList;

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await Axios.get(
        `/api/v1/products?slug=${match.params.slug}`
      );
      setProduct(data.data[0]);
      setLoading(false);
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    document.addEventListener("fb_init", (e) => window.FB.XFBML.parse());
  }, []);

  // useEffect(() => {
  //   window.fbAsyncInit = function () {
  //     window.FB.init({
  //       appId: "659192831443395",
  //       cookie: true, // enable cookies to allow the server to access the session
  //       xfbml: false, // parse social plugins on this page
  //       version: "v9.0",
  //     });
  //   };

  //   // Load the SDK asynchronously
  //   (function (d, s, id) {
  //     var js,
  //       fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) return;
  //     js = d.createElement(s);
  //     js.id = id;
  //     js.src = "//connect.facebook.net/vi_VN/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   })(document, "script", "facebook-jssdk");

  //   if (window.FB) {
  //     window.FB.XFBML.parse();
  //   }
  // });

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const {
    photos,
    title,
    prices,
    numReviews,
    numRatings,
    description,
    quantity,
    user,
    slug,
    _id,
  } = product;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.href}`);
    setCopySuccess("Đã sao chép liên kết!");
    setTimeout(() => {
      setCopySuccess("");
    }, 2000);
  };

  const addToFavorite = () => {};

  const savePost = () => {};

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        style={{ marginTop: "10px", marginLeft: "8px" }}
      >
        <Link
          color="inherit"
          to="/"
          style={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon style={{ marginRight: "5px", width: "20", height: "20" }} />
          Trang chủ
        </Link>
        <Link color="inherit" to="/products">
          Sản phẩm
        </Link>
        <Typography className="text-breadcrumbs" color="textPrimary">
          {title}
        </Typography>
      </Breadcrumbs>

      {/* <Category /> */}
      <div className="product-detail">
        {/* <Button startIcon={<KeyboardBackspaceIcon />}>Về trang chủ</Button> */}
        {!loading && user && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <CarouselPrdsDetail photos={photos} />
              <div className="product-description">
                <h3>{title}</h3>
                {/* <Rating
              value={numRatings}
              text={`(${numReviews} đánh giá)`}
              id={_id}
            /> */}
                <br />
                <h4 style={{ color: " #e74c3c" }}>
                  {prices.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                </h4>
                <div className="save-fav">
                  {/* Favorite */}
                  <Tooltip title="Thêm vào yêu thích">
                    <FavoriteBorderIcon onClick={addToFavorite} />
                  </Tooltip>
                  {/* Bookmark */}
                  <Tooltip title="Lưu bài viết">
                    <BookmarkBorderIcon onClick={savePost} />
                  </Tooltip>
                </div>
                <hr />
                <br />
                <Typography color="textSecondary" variant="subtitle2">
                  Nhà cung cấp:{" "}
                  <Link
                    style={{ color: "dodgerblue" }}
                    to={`/users/${user._id}`}
                  >
                    {user.shopName}
                  </Link>
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  Địa chỉ:{" "}
                  <Typography color="textPrimary" variant="inherit">
                    {user.address} | {user.city}
                  </Typography>
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  Số lượng có sẵn:{" "}
                  <Typography color="textPrimary" variant="inherit">
                    {quantity}
                  </Typography>
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  <br />
                  Chi tiết sản phẩm:
                </Typography>
                <Typography
                  className="description"
                  color="textPrimary"
                  variant="inherit"
                >
                  {ReactHtmlParser(description)}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div>
                <Typography color="textSecondary" variant="subtitle2">
                  Thông tin liên hệ:
                  <br />
                  {userInfo && (
                    <div className="contact">
                      <div className="phone">
                        <PhoneInTalkIcon />
                        <a href={`tel:${user.phoneNumber}`}>
                          {user.phoneNumber}{" "}
                        </a>
                      </div>
                      <div className="mess">
                        <MailOutlineIcon />
                        <a href={`sms://${user.phoneNumber}`}>Nhắn tin SMS</a>
                      </div>
                      {user.website && (
                        <div className="web">
                          <LanguageIcon />
                          <a
                            href={
                              user.website.startsWith("http://") ||
                              user.website.startsWith("https://")
                                ? user.website
                                : "https://" + user.website
                            }
                            target="_blank"
                          >
                            {user.website}
                          </a>
                        </div>
                      )}
                      {user.zalo && (
                        <div className="zalo">
                          <img src="/zalo.svg" />
                          <a
                            href={`https://zalo.me/${user.zalo}`}
                            target="_blank"
                          >
                            Zalo
                          </a>
                        </div>
                      )}
                      {user.facebook && (
                        <div className="facebook">
                          <img src="/fb.svg" />
                          <a
                            href={
                              user.facebook.startsWith("http://") ||
                              user.facebook.startsWith("https://")
                                ? user.facebook
                                : "https://" + user.facebook
                            }
                            target="_blank"
                          >
                            Facebook
                          </a>
                        </div>
                      )}
                    </div>
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
                <Typography color="textSecondary" variant="subtitle2">
                  <br />
                  Chia sẻ bài viết:
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

                    <div className="copy-link-btn">
                      <FileCopyOutlinedIcon
                        className="link-icon"
                        onClick={copyToClipboard}
                      />
                    </div>
                    <p>{copySucess !== "" && copySucess}</p>
                  </div>
                </Typography>
              </div>

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

              {/* <br />
              <h4>Sản phẩm khác của shop</h4>
              <Grid container spacing={2}>
                {products.slice(0, 3).map((product, index) => (
                  <Grid key={index} item xs={12} style={{ width: "75%" }}>
                    <Product product={product} />
                  </Grid>
                ))}
              </Grid> */}

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
          </Grid>
        )}

        {loading && <SkeletonPrdDetail />}
      </div>
    </>
  );
};

export default ProductDetail;
