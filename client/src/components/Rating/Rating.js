import React from "react";
import { Link } from "react-router-dom";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarHalfRoundedIcon from "@material-ui/icons/StarHalfRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import "./Rating.css";

function Rating({ value, text, color, id }) {
  return (
    <div className="rating">
      <div className="star">
        <span style={{ color }}>
          {value >= 1 ? (
            <StarRoundedIcon />
          ) : value >= 0.5 ? (
            <StarHalfRoundedIcon />
          ) : (
            <StarBorderRoundedIcon />
          )}
        </span>
        <span style={{ color }}>
          {value >= 2 ? (
            <StarRoundedIcon />
          ) : value >= 1.5 ? (
            <StarHalfRoundedIcon />
          ) : (
            <StarBorderRoundedIcon />
          )}
        </span>
        <span style={{ color }}>
          {value >= 3 ? (
            <StarRoundedIcon />
          ) : value >= 2.5 ? (
            <StarHalfRoundedIcon />
          ) : (
            <StarBorderRoundedIcon />
          )}
        </span>
        <span style={{ color }}>
          {value >= 4 ? (
            <StarRoundedIcon />
          ) : value >= 3.5 ? (
            <StarHalfRoundedIcon />
          ) : (
            <StarBorderRoundedIcon />
          )}
        </span>
        <span style={{ color }}>
          {value >= 5 ? (
            <StarRoundedIcon />
          ) : value >= 4.5 ? (
            <StarHalfRoundedIcon />
          ) : (
            <StarBorderRoundedIcon />
          )}
        </span>
        <span>{value}</span>
      </div>
      <div className="text">
        {/* <Link to={`/products/${id}/reviews`}> */}
        <Typography variant="caption">
          <span> {text && text}</span>
        </Typography>
        {/* </Link> */}
      </div>
    </div>
  );
}

Rating.defaultProps = {
  color: "#f8e825",
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
