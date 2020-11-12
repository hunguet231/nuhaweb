import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Product from "../Product/Product";
import "./ProductsList.css";

function ProductsList({ title }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/v1/products");

      setProducts(data.data);
    };
    fetchProducts();
  }, []);
  return (
    <div className="products-list">
      <h3>{title}</h3>
      <div className="list-items">
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid key={product._id} item xs={6} sm={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default ProductsList;
