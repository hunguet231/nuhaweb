import React from "react";
import { withRouter } from "react-router-dom";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography,
} from "@material-ui/core";
import "./Breadcrumbs.css";

function Breadcrumbs({ history, location: { pathname } }) {
  const pathnames = pathname.split("/").filter((x) => x);
  return (
    <MUIBreadcrumbs arial-label="breadcrumb" className="breadcrumbs">
      <Link onClick={() => history.push("/")}>Trang chủ</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography> {name} </Typography>
        ) : (
          <Link onClick={() => history.push(routeTo)}>{name}</Link>
        );
      })}
    </MUIBreadcrumbs>
  );
}

export default withRouter(Breadcrumbs);
