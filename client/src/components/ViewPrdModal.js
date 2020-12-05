import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ReactHtmlParser from "react-html-parser";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function ViewPrdModal({ openModal, toggleModal, product }) {
  const {
    title,
    description,
    quantity,
    photos,
    prices,
    category,
    updatedAt,
    createdAt,
  } = product;
  return (
    <>
      <Dialog
        onClose={toggleModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle id="customized-dialog-title" onClose={toggleModal}>
          Xem sản phẩm
        </DialogTitle>
        <DialogContent dividers>
          <img src={photos[0]} width="350" />
          <h4>Tên sản phẩm: </h4> {title}
          <h4>Số lượng còn lại: </h4> {quantity}
          <h4>Giá: </h4> {prices} đ<h4>Danh mục: </h4> {category}
          <h4>Cập nhật lần cuối: </h4> {new Date(updatedAt).toLocaleString()}
          <h4>Ngày tạo: </h4> {new Date(createdAt).toLocaleString()}
          <h4>Chi tiết: </h4> {ReactHtmlParser(description)}
        </DialogContent>
      </Dialog>
    </>
  );
}
