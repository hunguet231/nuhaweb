import React, { useState, useEffect } from "react";
import Rating from "../Rating/Rating";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid, Tooltip, Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import "./ProductDetail.css";
import SkeletonProductDetail from "../skeletons/SkeletonProductDetail";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import TelegramIcon from "@material-ui/icons/Telegram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkIcon from "@material-ui/icons/Link";

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
    num_reviews,
    phone_num,
    description,
    created_by,
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
      {!loading && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Grid container align="center">
              <Grid item xs={12}>
                <img src={photo} />
              </Grid>
            </Grid>

            <h3>{title}</h3>
            <Rating value={num_reviews} text={`(12 đánh giá)`} id={_id} />
            <h4 style={{ color: "#078DDC" }}>{prices * 1000} VNĐ</h4>
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
              {created_by && (
                <Link to={`/users/${created_by._id}`}>
                  {created_by.first_name}
                </Link>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary" variant="subtitle2">
              Chi tiết sản phẩm:
            </Typography>
            <Typography color="textPrimary" variant="inherit">
              {description}
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
              <br />
              Thông tin liên hệ:
              <br />
              <div className="contact">
                <div className="phone">
                  <PhoneInTalkIcon />
                  <a href={`tel:${phone_num}`}>{phone_num}</a>
                  <span>(Bấm vào số để gọi)</span>
                </div>
                <div className="mess">
                  <TelegramIcon />
                  <a href={`sms://${phone_num}?body=`}>Nhắn tin ngay</a>
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
                  <LinkIcon className="link-icon" onClick={copyToClipboard} />
                </Tooltip>
                <p>{copySucess !== "" && copySucess}</p>
              </div>
            </Typography>

            {/* Comment */}
            <Typography color="textSecondary" variant="subtitle2">
              <br />
              Đánh giá về sản phẩm:
              <Link to={`/products/${slug}/reviews`}> Xem tất cả</Link>
            </Typography>
          </Grid>
        </Grid>
      )}

      {loading && <SkeletonProductDetail />}
    </div>
  );
};

export default ProductDetail;
