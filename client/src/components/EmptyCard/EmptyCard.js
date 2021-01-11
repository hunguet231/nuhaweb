import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "./EmptyCard.css";
import { Tooltip } from "@material-ui/core";

function EmptyCard() {
  return (
    <Link to="/products">
      <div className="empty-card">
        <div className="text">Xem tất cả</div>
        <Tooltip title="Xem tất cả">
          <div className="icon-button">
            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </div>
        </Tooltip>
      </div>
    </Link>
  );
}

export default EmptyCard;
