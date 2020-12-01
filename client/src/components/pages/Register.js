import { CircularProgress, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import "./Register.css";

function Register({ location, history }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("An Giang");
  const cities = [
    "An Giang",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Bình Định",
    "Bạc Liêu",
    "Bắc Cạn",
    "Bắc Giang",
    "Bắc Ninh",
    "Bến Tre",
    "Cao Bằng",
    "Cà Mau",
    "Cần Thơ",
    "Gia Lai",
    "Huế",
    "Hà Giang",
    "Hà Nam",
    "Hà Nội",
    "Hà Tĩnh",
    "Hòa Bình",
    "Hưng Yên",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Long An",
    "Lào Cai",
    "Lâm Đồng",
    "Lạng Sơn",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "TP Hồ Chí Minh",
    "Thanh Hoá",
    "Thái Bình",
    "Thái Nguyên",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Tây Ninh",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Vũng Tàu",
    "Yên Bái",
    "Điện Biên",
    "Đà Nẵng",
    "Đắc Lắc",
    "Đắk Nông",
    "Đồng Nai",
    "Đồng Tháp",
  ];
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, location, userInfo, redirect]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Mật khẩu không khớp nhau");
      setTimeout(() => setMessage(null), 5000);
    } else {
      if (!error) {
        dispatch(
          register(firstName, lastName, shopName, city, email, password)
        );
      } else {
        return;
      }
    }
  };

  return (
    <div className="register">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img className="register-img" src="/register.svg" />
          <p className="slogan">Tạo tài khoản trong chốc lát!</p>
        </Grid>
        <Grid item xs={12} sm={6} align="center">
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="error">{message}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="name">
              <input
                type="text"
                placeholder="Họ"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Tên"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setShopName(e.target.value);
              }}
              required
            />
            <label className="city">
              <span className="title">Thành phố:</span>
              <select value={city} onChange={handleCityChange} required>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
            <input
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">
              Đăng ký{" "}
              {loading && (
                <CircularProgress style={{ color: "#fff" }} size={15} />
              )}
            </button>
          </form>
          <br />
          <p className="text-sm">Hoặc đăng ký với</p>
          <div className="fb">
            <img src="/facebook.svg" />
            <p>Facebook</p>
          </div>
          <div className="google">
            <img src="/google.svg" />
            <p>Google</p>
          </div>
          <p className="text-sm">
            Bạn đã có tài khoản?{" "}
            <Link
              style={{ color: "dodgerblue" }}
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              Đăng nhập
            </Link>
          </p>
        </Grid>
      </Grid>
    </div>
  );
}
export default Register;
