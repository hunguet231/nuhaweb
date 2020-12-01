import { Button, CircularProgress, TextField } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import { Alert, AlertTitle } from "@material-ui/lab";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Toaster from "../Toaster";
import "./UpdateShop.css";

function UpdateShop({ history }) {
  const [shopName, setShopName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [zalo, setZalo] = useState("");
  const [facebook, setFacebook] = useState("");
  const [error, setError] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // if (JSON.parse(localStorage.getItem("userInfo")).user.isSeller) {
    //   history.push("/me/sell/dashboard");
    // }
    window.scrollTo(0, 0);
    setIsUpdate(false);
  }, [
    shopName,
    phoneNumber,
    address,
    website,
    zalo,
    facebook,
    userInfo,
    history,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdate(false);

    const updateShop = async () => {
      try {
        setLoading(true);

        await Axios.put(
          "/api/v1/auth/update-shop",
          {
            shopName,
            phoneNumber,
            address,
            website,
            zalo,
            facebook,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setLoading(false);
        setIsUpdate(true);
        let userInfoLocal = JSON.parse(localStorage.getItem("userInfo"));
        userInfoLocal.user.isSeller = true;
        localStorage.setItem("userInfo", JSON.stringify(userInfoLocal));
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    };

    updateShop();
  };

  return (
    <div className="update-shop">
      <div className="heading">
        <UpdateIcon />
        <h3>Cập nhật thông tin shop</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <p>* Bắt buộc</p>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          variant="outlined"
          label="Tên shop"
          onChange={(e) => setShopName(e.target.value)}
          required
          value={shopName}
        />
        <TextField
          variant="outlined"
          label="Số điện thoại"
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          value={phoneNumber}
        />
        <TextField
          variant="outlined"
          label="Địa chỉ"
          onChange={(e) => setAddress(e.target.value)}
          required
          value={address}
        />
        <TextField
          variant="outlined"
          label="Website"
          onChange={(e) => setWebsite(e.target.value)}
          value={website}
        />
        <TextField
          variant="outlined"
          label="SĐT Zalo"
          onChange={(e) => setZalo(e.target.value)}
          value={zalo}
        />
        <TextField
          variant="outlined"
          label="Link Facebook"
          onChange={(e) => setFacebook(e.target.value)}
          value={facebook}
        />
        <button type="submit">
          Cập nhật{" "}
          {loading && <CircularProgress style={{ color: "#fff" }} size={15} />}
        </button>
        {isUpdate && (
          <Link
            style={{
              textAlign: "center",
              marginTop: "6px",
              textDecoration: "underline",
              color: "dodgerblue",
            }}
            to="/me/sell/dashboard"
          >
            Đến trang bán
          </Link>
        )}
      </form>
      {isUpdate && <Toaster msg={`Cập nhật thành công`} />}
    </div>
  );
}

export default UpdateShop;