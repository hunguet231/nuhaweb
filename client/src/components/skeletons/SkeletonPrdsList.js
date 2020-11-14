import { Grid } from "@material-ui/core";
import React from "react";
import SkeletonElement from "./SkeletonElement";

function SkeletonPrdsList({ theme }) {
  const themeClass = theme || "light";
  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <SkeletonElement type="title" />
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
          <Grid align="center" key={n} item xs={6} sm={4} lg={3}>
            <SkeletonElement type="thumbnail" />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default SkeletonPrdsList;
