import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PortraitIcon from "@material-ui/icons/Portrait";
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
  const { DateTime } = require("luxon");
  const date = DateTime.local().setLocale("vi");
  let dur = Date.now() - Date.parse(updatedAt);

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
            <h4 className="title">{title}</h4>
          </Link>
          <div className="author">
            <Typography variant="subtitle2" color="textSecondary">
              <PortraitIcon />
            </Typography>

            <Typography variant="subtitle2" color="textSecondary">
              Đăng bởi:
              <Link to={`/users/${user._id}`}> {user.firstName}</Link>
            </Typography>
          </div>
          {/* Display time relative to a now */}
          <div className="time">
            <Typography variant="subtitle2" color="textSecondary">
              <AccessTimeIcon />
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {date.minus(dur).toRelative()}
            </Typography>
          </div>
          <div className="prices">
            <h4>{prices} VNĐ</h4>
          </div>

          {/* <Rating
            value={numRatings}
            text={`(${numReviews} đánh giá)`}
            id={_id}
          /> */}
        </div>
      </div>
    </>
  );
}

export default Product;
