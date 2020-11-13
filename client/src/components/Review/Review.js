import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { TextField, Typography } from "@material-ui/core";
import "./Review.css";

function Review() {
  return (
    <div className="review">
      {/* Review */}
      <Typography color="textSecondary" variant="subtitle2">
        <br />
        Để lại đánh giá của bạn:
        <br />
      </Typography>
      <AccountCircle />
      <TextField fullWidth label="Hung Nguyen" />
      <Typography color="textSecondary" variant="subtitle2">
        <br />
        Tất cả đánh giá:
      </Typography>
    </div>
  );
}

export default Review;
