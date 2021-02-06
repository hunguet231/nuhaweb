import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Rating as MuiRating } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import "./Rating.css";

const StyledRating = withStyles({
  iconFilled: {
    color: "#f8e825",
  },
  iconHover: {
    color: "#f8e825",
  },
})(MuiRating);

const Rating = ({ size, text, defaultValue, readOnly, getRatingValue }) => {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    getRatingValue(newValue);
  };

  return (
    <div>
      {readOnly ? (
        <>
          <div className="rating">
            <StyledRating
              name="read-only"
              emptyIcon={
                <StarBorderRoundedIcon
                  style={{ color: "#f8e825" }}
                  fontSize="inherit"
                />
              }
              size={size}
              value={value}
              readOnly
            />
            {/* <Link to={`/products/${id}/reviews`}> */}
            <Typography variant="caption">
              <span> {text && text}</span>
            </Typography>
            {/* </Link> */}
          </div>
        </>
      ) : (
        <>
          <div className="rating">
            <StyledRating
              emptyIcon={
                <StarBorderRoundedIcon
                  style={{ color: "#f8e825" }}
                  fontSize="inherit"
                />
              }
              size={size}
              name="simple-controlled"
              value={value}
              onChange={handleChange}
            />
            {/* <Link to={`/products/${id}/reviews`}> */}
            <Typography variant="caption">
              <span> {text && text}</span>
            </Typography>
            {/* </Link> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Rating;
