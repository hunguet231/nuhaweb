import React from "react";
import Skeleton from "react-loading-skeleton";
import { Grid } from "@material-ui/core";
import "./Skeleton.css";

function SkeletonPrdDetail() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Grid container align="center">
            <Grid item xs={12}>
              <Skeleton width={`100%`} height={350} />
            </Grid>
          </Grid>

          <div className="col">
            <Skeleton width={100} height={10} />
            <Skeleton width={300} height={10} />
            <Skeleton width={100} height={10} />
            <Skeleton width={300} height={10} />
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Skeleton width={100} height={10} />
          <Skeleton width={300} height={10} />
          <Skeleton width={100} height={10} />
          <Skeleton width={300} height={10} />
          <Skeleton width={100} height={10} />
          <Skeleton width={300} height={10} />
        </Grid>
      </Grid>
    </div>
  );
}

export default SkeletonPrdDetail;
