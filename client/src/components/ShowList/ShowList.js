import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Product from "../Product/Product";
import "./ShowList.css";
import SkeletonPrdsList from "../skeletons/SkeletonPrdsList";

function ShowList({ title }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await axios.get("/api/v1/products");

      setProducts(data.data);
      setLoading(false);
    };
    fetchProducts();
  }, []);
  return (
    <div className="products-list">
      {!loading && (
        <>
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
        </>
      )}

      {loading && <SkeletonPrdsList />}
    </div>
  );
}

export default ShowList;
