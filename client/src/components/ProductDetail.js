import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/v1/products/${match.params.id}`);

      setProduct(data);
    };
    fetchProduct();
  }, []);

  return (
    <div>
      <p>Detail</p>
      <p>{product.title}</p>
    </div>
  );
};

export default ProductDetail;
