import React, { useState, useEffect } from "react";
import Rating from "../Rating/Rating";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid, Tooltip, Typography, TextField } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import "./ProductDetail.css";
import SkeletonProductDetail from "../skeletons/SkeletonProductDetail";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import TelegramIcon from "@material-ui/icons/Telegram";
import FacebookIcon from "@material-ui/icons/Facebook";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [copySucess, setCopySuccess] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/products?slug=${match.params.slug}`
      );
      setProduct(data.data[0]);
      setLoading(false);
    };
    fetchProduct();
  }, []);

  const {
    photo,
    title,
    prices,
    numReviews,
    numRatings,
    description,
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
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Grid container align="center">
              <Grid item xs={12}>
                <br />
                <img src={photo} />
              </Grid>
            </Grid>

            <h3>{title}</h3>
            <Rating
              value={numRatings}
              text={`(${numReviews} đánh giá)`}
              id={_id}
            />
            <h4 style={{ color: "#078DDC" }}>{prices} VNĐ</h4>
            <br />
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
              {user && <Link to={`/users/${user._id}`}>{user.shopName}</Link>}
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
            <Typography color="textSecondary" variant="subtitle2">
              <br />
              Thông tin liên hệ:
              <br />
              <div className="contact">
                <div className="phone">
                  <PhoneInTalkIcon />
                  <a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a>
                  <span>(Bấm vào số để gọi)</span>
                </div>
                <div className="mess">
                  <TelegramIcon />
                  <a href={`sms://${user.phoneNumber}?body=`}>Nhắn tin ngay</a>
                </div>
              </div>
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
                    <FacebookIcon className="fb-icon" />
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
          </Grid>
        </Grid>
      )}

      {loading && <SkeletonProductDetail />}
    </div>
  );
};

export default ProductDetail;
