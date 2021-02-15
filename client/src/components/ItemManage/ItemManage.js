import {
  Checkbox,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import swal from "@sweetalert/with-react";
import Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Confirm } from "react-st-modal";
import ViewPrdModal from "../ViewPrdModal";
import "./ItemManage.css";

function ItemManage({ product, history }) {
  const {
    title,
    slug,
    user,
    photos,
    quantity,
    updatedAt,
    createdAt,
    _id,
  } = product;

  const { DateTime } = require("luxon");
  const date = DateTime.local().setLocale("vi");
  let dur = Date.now() - Date.parse(updatedAt);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const toggleModal = () => {
    setModal(!modal);
  };

  // menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewProduct = () => {
    setModal(true);
    setAnchorEl(null);
  };

  const handleEditProduct = () => {
    setAnchorEl(null);
  };

  const deleteProduct = async () => {
    // delete request
    await Axios.delete(`/api/v1/products/${_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    // show message
    swal({
      title: "Đã xoá",
      icon: "success",
    }).then(function () {
      // reload
      window.location.reload();
    });
  };

  const handleClickDelete = async () => {
    setAnchorEl(null);
    const isConfirm = await Confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");

    if (isConfirm) {
      deleteProduct();
    }
  };

  return (
    <>
      <ViewPrdModal
        product={product}
        openModal={modal}
        toggleModal={toggleModal}
      />
      <Grid className="item" item xs={12} md={6}>
        <div className="check-box">
          <Checkbox checked={checked} onChange={handleChange} size="small" />
        </div>
        <Link to={`/products/${slug}/${user._id}`}>
          <div className="photo">
            <div
              className="inner"
              style={{ backgroundImage: `url(${photos[0]})` }}
            ></div>
          </div>
        </Link>
        <div className="text">
          <Link to={`/products/${slug}/${user._id}`}>
            <h4>{title}</h4>
          </Link>
          <Typography variant="body2">
            <span className="text-dark">Số lượng còn lại:</span> {quantity}
          </Typography>
          <Typography variant="body2">
            <span className="text-dark">Cập nhật lần cuối:</span>{" "}
            {date.minus(dur).toRelative()}
          </Typography>
        </div>
        <div className="action">
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleViewProduct}>
              <ArtTrackIcon />{" "}
              <Typography variant="subtitle2">Chi tiết</Typography>
            </MenuItem>
            <Link to={`/products/${slug}/edit`}>
              <MenuItem onClick={handleEditProduct}>
                <EditOutlinedIcon />{" "}
                <Typography variant="subtitle2">Sửa</Typography>
              </MenuItem>
            </Link>
            <MenuItem onClick={handleClickDelete}>
              <DeleteOutlinedIcon />{" "}
              <Typography variant="subtitle2">Xoá</Typography>
            </MenuItem>
          </Menu>
        </div>
      </Grid>
    </>
  );
}

export default ItemManage;
