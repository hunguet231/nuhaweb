import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, MenuItem, TextField } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import cities from "../../ultils/cities";
import CheckoutStep from "../../components/CheckoutStep/CheckoutStep";
import { saveShippingAddress } from "../../actions/cartActions";
import "./Shipping.css";

function Shipping({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [userName, setUserName] = useState(shippingAddress.userName);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ userName, phoneNumber, address, city }));
    history.push("/payment");
  };

  return (
    <div className="shipping-wrapper">
      <CheckoutStep step={0} />

      <div className="title">
        <InfoIcon />
        <p>Thông tin nhận hàng</p>
      </div>

      <form className="address-box" onSubmit={submitHandler}>
        <TextField
          variant="outlined"
          label="Họ tên"
          onChange={(e) => setUserName(e.target.value)}
          required
          value={userName}
        />
        <TextField
          variant="outlined"
          label="Số điện thoại"
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          value={phoneNumber}
        />
        <div className="text-info">
          Dùng số điện thoại bạn thường xuyên liên lạc
        </div>
        <TextField
          variant="outlined"
          select
          label="Chọn tỉnh/thành phố *"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          label="Địa chỉ chi tiết"
          onChange={(e) => setAddress(e.target.value)}
          required
          value={address}
        />
        <div className="text-info">
          Ví dụ: Số 1, đường Phạm Văn Đồng, Dịch Vọng Hậu, Cầu Giấy
        </div>
        <Button
          type="submit"
          style={{ marginTop: "10px" }}
          variant="contained"
          color="secondary"
        >
          Tiếp tục
        </Button>
      </form>
    </div>
  );
}

export default Shipping;
