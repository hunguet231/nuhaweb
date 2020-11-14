import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Rating from "../Rating/Rating";
import "./Product.css";

function Product({
  product: {
    _id,
    photo,
    title,
    prices,
    user,
    quantity,
    numRatings,
    numReviews,
    slug,
    updatedAt,
  },
}) {
  return (
    <>
      <div className="product-item">
        <div className="product-item-header">
          <Link to={`/products/${slug}`}>
            <div className="inner">
              <img src={photo} />
            </div>
          </Link>
        </div>
        <div className="product-item-body">
          <Link to={`/products/${slug}`}>
            <h4>{title}</h4>
          </Link>

          <Typography variant="subtitle2" color="textSecondary">
            Đăng bởi:
            <Link to={`/users/${user._id}`}> {user.firstName}</Link>
          </Typography>
          <h4 style={{ color: "#078DDC" }}>{prices} VNĐ</h4>

          <Rating
            value={numRatings}
            text={`(${numReviews} đánh giá)`}
            id={_id}
          />
        </div>
      </div>
    </>
  );
}

export default Product;
