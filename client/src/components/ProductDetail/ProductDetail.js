import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Tooltip, Typography, TextField } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LanguageIcon from "@material-ui/icons/Language";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SkeletonPrdDetail from "../skeletons/SkeletonPrdDetail";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import "./ProductDetail.css";
import { useSelector } from "react-redux";
import CarouselPrdsDetail from "../CarouselPrdsDetail";
import Axios from "axios";

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [copySucess, setCopySuccess] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="product-detail">
      {!loading && user && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Grid container align="center">
              <Grid item xs={12}>
                <CarouselPrdsDetail photos={photos} />
              </Grid>
            </Grid>
            <br />
            <h3>{title}</h3>
            {/* <Rating
              value={numRatings}
              text={`(${numReviews} đánh giá)`}
              id={_id}
            /> */}
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
              <Link style={{ color: "dodgerblue" }} to={`/users/${user._id}`}>
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
            <Typography color="textPrimary" variant="inherit">
              {description}
            </Typography>
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
                      <a href={`sms://${user.phoneNumber}?body=`}>
                        Nhắn tin SMS
                      </a>
                    </div>
                    {user.website && (
                      <div className="web">
                        <LanguageIcon />
                        <a
                          href={
                            user.website.startsWith("htttp://")
                              ? user.website
                              : "http://" + user.website
                          }
                          target="_blank"
                        >
                          Wesite: {user.website}
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
                            user.facebook.startsWith("htttp://")
                              ? user.facebook
                              : "http://" + user.facebook
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
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener"
                  >
                    <Tooltip title="Chia sẻ qua Facebook">
                      {/* <FacebookIcon className="fb-icon" /> */}
                      <img src="/facebook.svg" className="fb-icon" />
                    </Tooltip>
                  </a>

                  <Tooltip title="Sao chép liên kết">
                    <FileCopyOutlinedIcon
                      className="link-icon"
                      onClick={copyToClipboard}
                    />
                  </Tooltip>
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
            <h4>Sản phẩm khác của shop</h4>
          </Grid>
        </Grid>
      )}

      {loading && <SkeletonPrdDetail />}
    </div>
  );
};

export default ProductDetail;
