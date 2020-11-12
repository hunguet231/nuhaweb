import React, { useState, useEffect } from "react";
import Rating from "../Rating/Rating";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import "./ProductDetail.css";
import SkeletonProductDetail from "../skeletons/SkeletonProductDetail";

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

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

  const { photo, title, prices, num_reviews, description, _id } = product;

  return (
    <div className="product-detail">
      {!loading && (
        <Grid container spacing={3}>
          <Grid item align="center" xs={12} sm={6}>
            <img src={photo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <h3>{title}</h3>
            <Rating value={num_reviews} text={`(12 đánh giá)`} id={_id} />
            <br />
            <h4 style={{ color: "#078DDC" }}>{prices * 1000} VNĐ</h4>
            <br />
            <div className="save-fav">
              {/* Favorite */}
              <FavoriteBorderIcon />
              {/* Bookmark */}
              <BookmarkBorderIcon />
            </div>
            <hr />
            <br />
            <Typography color="textSecondary" variant="subtitle2">
              Chi tiết sản phẩm:
            </Typography>
            <Typography color="textPrimary" variant="body1">
              {description}
            </Typography>
          </Grid>
        </Grid>
      )}

      {loading && <SkeletonProductDetail />}
    </div>
  );
};

export default ProductDetail;
