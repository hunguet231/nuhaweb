import { Grid } from "@material-ui/core";
import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

function SkeletonProductDetail({ theme }) {
  const themeClass = theme || "light";
  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Grid container align="center">
            <Grid item xs={12}>
              <SkeletonElement type="thumbnail" />
            </Grid>
          </Grid>

          <SkeletonElement type="title" />
          <SkeletonElement type="title" />
          <SkeletonElement type="title" />
          <SkeletonElement type="title" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SkeletonElement type="title" />
          <SkeletonElement type="textArea" />
        </Grid>
      </Grid>
      <Shimmer />
    </div>
  );
}

export default SkeletonProductDetail;
