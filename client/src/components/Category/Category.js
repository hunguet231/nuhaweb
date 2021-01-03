import React from "react";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./Category.css";

function Category() {
  return (
    <div className="category">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <DashboardOutlinedIcon />
          <div className="category-title">Danh mục</div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Category;
