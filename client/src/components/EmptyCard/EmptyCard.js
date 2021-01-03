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
        <div className="icon-button">
          <Tooltip title="Xem tất cả">
            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </Link>
  );
}

export default EmptyCard;
