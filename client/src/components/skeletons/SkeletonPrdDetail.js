import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Grid } from "@material-ui/core";
import "./Skeleton.css";

function SkeletonPrdDetail() {
  return (
    <div className="skeleton">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Skeleton variant="rect" width="100%" height={40} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rect" width="100%" height={275} />
          <br />

          <Skeleton width={100} height={15} />
          <Skeleton width={280} height={15} />
          <Skeleton width={100} height={15} />
          <Skeleton width={280} height={15} />
          <Skeleton width={100} height={15} />
          <Skeleton width={280} height={15} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton width={100} height={15} />
          <Skeleton width={280} height={15} />
          <Skeleton width={100} height={15} />
          <Skeleton width={280} height={15} />
          <Skeleton width={100} height={15} />
          <Skeleton width={280} height={15} />
          <br />
          <div className="row">
            <Skeleton variant="rect" width={50} height={50} />
            <div className="row-text">
              <Skeleton width={280} height={15} />
              <Skeleton width={280} height={15} />
              <Skeleton width={280} height={15} />
            </div>
          </div>
          <div className="row">
            <Skeleton variant="rect" width={50} height={50} />
            <div className="row-text">
              <Skeleton width={280} height={15} />
              <Skeleton width={280} height={15} />
              <Skeleton width={280} height={15} />
            </div>
          </div>
          <div className="row">
            <Skeleton variant="rect" width={50} height={50} />
            <div className="row-text">
              <Skeleton width={280} height={15} />
              <Skeleton width={280} height={15} />
              <Skeleton width={280} height={15} />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SkeletonPrdDetail;
