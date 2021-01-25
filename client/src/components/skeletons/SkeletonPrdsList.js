import { Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import "./Skeleton.css";

function SkeletonPrdsList() {
  return (
    <div>
      <Skeleton animation="wave" height={20} width={100} />
      <Grid container spacing={1}>
        {Array(12)
          .fill()
          .map((item, index) => (
            <Grid key={index} item xs={6} sm={3}>
              <div className="img">
                <Skeleton
                  variant="rect"
                  animation="wave"
                  width="auto"
                  height={170}
                />
              </div>
              <div className="text">
                <div className="row">
                  <div className="circle">
                    <Skeleton variant="circle" width={20} height={20} />
                  </div>
                  <Skeleton width="100%" height={20} />
                </div>
                <div className="row">
                  <div className="circle">
                    <Skeleton variant="circle" width={20} height={20} />
                  </div>
                  <Skeleton width="100%" height={20} />
                </div>
              </div>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default SkeletonPrdsList;
