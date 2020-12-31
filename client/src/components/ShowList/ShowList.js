import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Product from "../Product/Product";
import "./ShowList.css";
import SkeletonPrdsList from "../skeletons/SkeletonPrdsList";
import { listProducts } from "../../actions/productActions";

function ShowList({ title, color }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="products-list">
      {!loading && (
        <>
          <div
            style={{ borderLeft: `5px solid ${color}` }}
            className="title-top"
          >
            {title}
          </div>
          <div className="list-items">
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid key={product._id} item xs={6} sm={4} lg={3}>
                  <Product color={color} product={product} />
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
