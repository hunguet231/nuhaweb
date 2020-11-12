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
    created_by,
    quantity,
    num_ratings,
    num_reviews,
    slug,
    updated_at,
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
            <Link to={`/users/${created_by._id}`}>
              {" "}
              {created_by.first_name}
            </Link>
          </Typography>
          <h4 style={{ color: "#078DDC" }}>{prices * 1000} VNĐ</h4>
          <Rating value={3.5} text={`(12 đánh giá)`} id={_id} />
        </div>
      </div>
    </>
  );
}

export default Product;
