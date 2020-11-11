import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import WeekendRoundedIcon from "@material-ui/icons/WeekendRounded";
import PhoneAndroidRoundedIcon from "@material-ui/icons/PhoneAndroidRounded";
import "./Category.css";

function Category() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <div className="category">
      <Accordion expanded="true">
        <AccordionSummary
          className="category-summary"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ListAltRoundedIcon />
          <Typography>Danh mục</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* List of categories */}
          <List component="nav" aria-label="main mailbox folders">
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <WeekendRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Nội thất gia đình" />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <PhoneAndroidRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Điện thoại" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Category;
