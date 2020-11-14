import { Grid } from "@material-ui/core";
import React from "react";
import SkeletonElement from "./SkeletonElement";

function SkeletonProductDetail({ theme }) {
  return (
    <div className={`skeleton-wrapper`}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Grid container align="center">
            <Grid item xs={12}>
              <SkeletonElement type="thumbnail" />
            </Grid>
          </Grid>

          <SkeletonElement type="title" />
          <SkeletonElement type="title" />
          <SkeletonElement type="title" />
          <SkeletonElement type="textArea" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SkeletonElement type="title" />
          <SkeletonElement type="title" />
          <SkeletonElement type="title" />
          <br />
          <SkeletonElement type="title" />
          <SkeletonElement type="textArea" />
        </Grid>
      </Grid>
    </div>
  );
}

export default SkeletonProductDetail;
