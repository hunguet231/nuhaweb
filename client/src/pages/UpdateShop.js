import {
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import { Alert, AlertTitle } from "@material-ui/lab";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Toaster from "../components/Toaster";
import "./UpdateShop.css";
import cities from "../ultils/cities";

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
  const [city, setCity] = useState("An Giang");

  // user info
  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);

  const userInfo = googleLogin.userInfo
    ? googleLogin.userInfo
    : userLogin.userInfo;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
            city,
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
        }, 5000);
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
        <div className="text-info">* Bắt buộc</div>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          variant="outlined"
          label="Tên shop"
          onChange={(e) => setShopName(e.target.value)}
          required
          value={shopName}
        />
        <div className="text-info">Ví dụ: NUHA Shop</div>
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
        <div className="text-info">
          Các thông tin trên sẽ được hiển thị công khai, mặc định cho sản phẩm,
          bạn có thể thay đổi khi đăng sản phẩm
        </div>
        <button type="submit" className="submit-btn">
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
