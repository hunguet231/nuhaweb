import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Product from "../Product/Product";
import "./ShowList.css";
import SkeletonPrdsList from "../skeletons/SkeletonPrdsList";
import { listProducts } from "../../actions/productActions";
import EmptyCard from "../EmptyCard/EmptyCard";

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
          <div style={{ background: `${color}` }} className="title-top">
            {title}
          </div>
          <div className="list-items">
            <Grid container spacing={1}>
              {products &&
                products.map((product) => (
                  <Grid key={product._id} item xs={6} sm={3}>
                    <Product product={product} />
                  </Grid>
                ))}
              <Grid item xs={6} sm={3}>
                <EmptyCard />
              </Grid>
            </Grid>
          </div>
        </>
      )}
      {loading && <SkeletonPrdsList />}
    </div>
  );
}

export default ShowList;
