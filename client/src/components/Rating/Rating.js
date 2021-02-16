import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Rating as MuiRating } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import "./Rating.css";

const StyledRating = withStyles({
  root: {
    zIndex: "0",
  },
  iconFilled: {
    color: "#f8e825",
  },
  iconHover: {
    color: "#f8e825",
  },
})(MuiRating);

const Rating = ({
  showFirstNum,
  size,
  text,
  defaultValue,
  readOnly,
  getRatingValue,
}) => {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    getRatingValue(newValue);
  };

  return (
    <div className="rating">
      {showFirstNum ? (
        <Typography variant="caption">
          {defaultValue
            ? defaultValue === 0
              ? 0
              : defaultValue.toFixed(1)
            : ""}
        </Typography>
      ) : (
        ""
      )}

      {readOnly ? (
        <StyledRating
          name="read-only"
          precision={0.5}
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
      ) : (
        <StyledRating
          emptyIcon={
            <StarBorderRoundedIcon
              style={{ color: "#f8e825" }}
              fontSize="inherit"
            />
          }
          size={size}
          name="simple-controlled"
          precision={0.5}
          value={value}
          onChange={handleChange}
        />
      )}

      <Typography variant="caption">
        <span> {text && text}</span>
      </Typography>
    </div>
  );
};

export default Rating;
