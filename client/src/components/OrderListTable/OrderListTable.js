import { Chip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import TuneRoundedIcon from "@material-ui/icons/TuneRounded";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./OrderListTable.css";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function createData(sku, date, total, paid, delivered, details) {
  return { sku, date, total, paid, delivered, details };
}

const headCells = [
  {
    id: "sku",
    numeric: false,
    disablePadding: true,
    label: "Mã đơn",
  },
  { id: "date", numeric: false, disablePadding: false, label: "Ngày đặt hàng" },
  { id: "total", numeric: true, disablePadding: false, label: "Tổng tiền" },
  { id: "paid", numeric: false, disablePadding: false, label: "Thanh toán" },
  {
    id: "delivered",
    numeric: false,
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    id: "details",
    numeric: false,
    disablePadding: false,
    label: "Chi tiết",
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#74b9ff",
    color: "#fff",
  },
  toolbarLeft: {
    display: "flex",
    flexDirection: "column",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {
    flex: "1 1",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={clsx(classes.root)}>
      <div className={clsx(classes.toolbarLeft)}>
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Đơn hàng của tôi
        </Typography>
        <Typography variant="caption">
          Tổng đơn: {props.orders.length}
        </Typography>
        <Typography variant="caption">
          Tổng tiền:{" "}
          {props.orders
            .reduce((acc, item) => {
              return acc + parseInt(item.totalPrice.replace(/[.]/g, ""));
            }, 0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
          ₫
        </Typography>
      </div>
      <div className="toolbar-right">
        <Tooltip title="Lọc danh sách">
          <IconButton aria-label="filter list" onClick={props.handleFilterList}>
            <TuneRoundedIcon style={{ color: "#fff" }} />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({ orders }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = orders.map((order) =>
    createData(
      `#${order.sku}`,
      order.createdAt.substring(0, 10),
      parseInt(order.totalPrice.replace(/[.]/g, "")),
      order.isPaid,
      order.isDelivered,
      order._id
    )
  );

  const handleFilterList = (filter) => {
    switch (filter) {
      case "unpaid":
      case "paid":
      case "not delivery":
      case "delivered":
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          handleFilterList={handleFilterList}
          orders={orders}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover key={row.sku}>
                      <TableCell></TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {row.sku}
                      </TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">
                        {row.total
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                        ₫
                      </TableCell>
                      <TableCell align="left">
                        {row.paid ? (
                          <Chip
                            style={{ backgroundColor: "#55efc4" }}
                            label="Đã thanh toán"
                            size="small"
                            icon={<DoneRoundedIcon />}
                            tex
                          />
                        ) : (
                          <Chip
                            color="secondary"
                            label="Chưa thanh toán"
                            size="small"
                            icon={<CloseRoundedIcon />}
                            tex
                          />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {row.delivered ? (
                          <Chip
                            style={{ backgroundColor: "#55efc4" }}
                            label="Đã giao"
                            size="small"
                            icon={<DoneRoundedIcon />}
                            tex
                          />
                        ) : (
                          <Chip
                            color="secondary"
                            label="Chưa giao"
                            size="small"
                            icon={<CloseRoundedIcon />}
                            tex
                          />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <Link
                          style={{ color: "dodgerblue" }}
                          to={`/order/${row.details}`}
                        >
                          Xem
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          labelDisplayedRows={({ from, to, count }) => {
            return `${from} - ${to} của ${
              count !== -1 ? count : `nhiều hơn ${to}`
            }`;
          }}
          labelRowsPerPage="Số hàng hiển thị một trang"
          nextIconButtonText="Trang tiếp"
          backIconButtonText="Trang trước"
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
