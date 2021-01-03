import React from "react";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import "./ProductMini.css";

function ProductMini({
  product: { photos, user, title, prices, category, slug },
}) {
  return (
    <a href={`/products/${slug}/${user._id}`}>
      <div className="product-mini">
        <div
          className="img"
          style={{ backgroundImage: `url(${photos[0]})` }}
        ></div>

        <div className="text">
          <div className="title">{title}</div>
          <div className="category-b">
            <LocalOfferIcon className="mr-5" />
            {category}
          </div>
          <div className="prices">{prices} đ</div>
        </div>
      </div>
    </a>
  );
}

export default ProductMini;
