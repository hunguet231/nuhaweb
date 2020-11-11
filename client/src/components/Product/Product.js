import React from "react";

function Product({
  product: { photo_url, title, prices, created_by, quantity, num_ratings },
}) {
  return (
    <>
      <div className="product-item">
        <img src={photo_url} />
        <h1>{title}</h1>
        <p>{prices}</p>
      </div>
    </>
  );
}

export default Product;
