import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PortraitIcon from "@material-ui/icons/Portrait";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "../Rating/Rating";
import "./Product.css";

function Product({
  product: {
    _id,
    title,
    photos,
    prices,
    user,
    quantity,
    category,
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
      {user && (
        <div className="product-item">
          <Link to={`/products/${slug}`}>
            <div className="product-item-header" title={title}>
              <div
                className="img"
                style={{ backgroundImage: `url(${photos[0]})` }}
              ></div>
            </div>
          </Link>
          <div className="product-item-body">
            <Link to={`/products/${slug}`}>
              <Typography className="title" variant="body2" title={title}>
                {title}
              </Typography>
            </Link>
            <div className="author">
              <Typography variant="subtitle2" color="textSecondary">
                <PortraitIcon />
              </Typography>

              <Typography variant="subtitle2" color="textSecondary">
                Đăng bởi:
                <Link className="name" to={`/users/${user._id}`}>
                  {" "}
                  {user.firstName}
                </Link>
              </Typography>
            </div>
            {/* Display time relative to a now */}
            <div className="city">
              <Typography variant="subtitle2" color="textSecondary">
                <LocationOnOutlinedIcon />
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {user.city}
              </Typography>
            </div>

            <div className="prices">
              <h4>
                {prices.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
              </h4>
            </div>

            {/* <Rating
            value={numRatings}
            text={`(${numReviews} đánh giá)`}
            id={_id}
          /> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
