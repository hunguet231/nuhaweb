import { Grid } from "@material-ui/core";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "./Skeleton.css";

function SkeletonPrdsList() {
  return (
    <div>
      <Skeleton height={15} width={200} />
      <Grid container spacing={2}>
        {Array(12)
          .fill()
          .map((item, index) => (
            <Grid key={index} item xs={6} sm={4} lg={3}>
              <div className="img">
                <Skeleton width={200} height={150} />
              </div>
              <div className="text">
                <div className="row">
                  <div className="circle">
                    <Skeleton circle width={20} height={20} />
                  </div>
                  <Skeleton width={177} height={10} />
                </div>
                <div className="row">
                  <div className="circle">
                    <Skeleton circle width={20} height={20} />
                  </div>
                  <Skeleton width={177} height={10} />
                </div>
              </div>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default SkeletonPrdsList;
