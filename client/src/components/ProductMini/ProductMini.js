import React from "react";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import "./ProductMini.css";

function ProductMini({
  product: { photos, user, title, prices, category, slug },
}) {
  return (
    <div className="product-mini">
      <div
        className="img"
        style={{ backgroundImage: `url(${photos[0]})` }}
      ></div>

      <div className="text">
        <div className="title-mini">{title}</div>

        <div className="prices">
          <MonetizationOnOutlinedIcon className="mr-5" />
          {prices} ₫
        </div>
        <div className="category-b">
          <LocalOfferIcon className="mr-5" />
          {category}
        </div>
      </div>
    </div>
  );
}

export default ProductMini;
