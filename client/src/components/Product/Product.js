import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
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
        <div
          className={quantity > 0 ? `product-item` : `product-item sold-out`}
        >
          <Link to={`/products/${slug}/${user._id}`}>
            <div className="product-item-header" title={title}>
              <div
                className="img"
                style={{ backgroundImage: `url(${photos[0]})` }}
              >
                <div className="sold-out-text">
                  <p>Hết hàng</p>
                </div>
              </div>
            </div>
          </Link>
          <div className="product-item-body">
            <Link
              to={`/products/${slug}/${user._id}`}
              className="title"
              title={title}
            >
              {title}
            </Link>
            <div className="author">
              <Typography variant="subtitle2" color="textSecondary">
                <PortraitIcon />
              </Typography>

              <Typography variant="subtitle2" color="textSecondary">
                <Link className="name" to={`/users/${user._id}`}>
                  {" "}
                  {user.shopName}
                </Link>
              </Typography>
            </div>
            <div className="city">
              <Typography variant="subtitle2" color="textSecondary">
                <LocationOnOutlinedIcon />
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {user.city}
              </Typography>
            </div>

            <div className="prices">
              <p>{prices.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ₫</p>
            </div>

            <Rating
              readOnly
              showFirstNum
              size="small"
              defaultValue={numRatings}
              text={`(${numReviews} đánh giá)`}
              id={_id}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
