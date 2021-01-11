import {
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import "./Register.css";

function Register({ location, history }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, location, userInfo, redirect]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Mật khẩu không khớp nhau");
      setTimeout(() => setMessage(null), 5000);
    } else {
      if (!error) {
        dispatch(register(firstName, lastName, shopName, email, password));
      } else {
        return;
      }
    }
  };

  // handle social login
  const responseFacebook = (response) => {};

  const responseGoogle = (response) => {
    const { loading, error, userInfo } = userRegister;
    const {
      profileObj: { email, familyName, givenName, googleId, imageUrl },
    } = response;

    if (!error) {
      dispatch(
        register(givenName, familyName, email, email, googleId, imageUrl)
      );
    }
  };

  const handlePaswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(values.password);
  };

  const handleConfirmPaswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setConfirmPassword(values.confirmPassword);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="register">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img className="register-img" src="/register.svg" />
          <p className="slogan">Tạo tài khoản trong chốc lát!</p>
        </Grid>
        <Grid item xs={12} sm={6}>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="error">{message}</Alert>}
          <h3 className="text-align-center">Đăng ký</h3>
          <form onSubmit={handleSubmit}>
            <div className="name">
              <TextField
                label="Họ"
                variant="outlined"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <TextField
                label="Tên"
                variant="outlined"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <TextField
              type="email"
              variant="outlined"
              autoComplete="username"
              label="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setShopName(e.target.value);
              }}
              required
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Mật khẩu
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                value={values.password}
                onChange={handlePaswordChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Nhập lại mật khẩu
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                value={values.confirmPassword}
                onChange={handleConfirmPaswordChange("confirmPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={120}
              />
            </FormControl>
            <p className="text-info text-align-center">
              Khi bấm vào "Đăng ký" nghĩa là bạn đã hiểu và đồng ý với các{" "}
              <a href="/help/terms">điều khoản & chính sách</a> của NUHA
            </p>
            <button type="submit" className="submit-btn">
              Đăng ký{" "}
              {loading && (
                <CircularProgress style={{ color: "#fff" }} size={15} />
              )}
            </button>
          </form>
          <br />
          <p className="text-sm text-align-center">Hoặc</p>
          <FacebookLogin
            textButton="Đăng nhập với Facebook"
            appId="659192831443395"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            icon={<img src="/facebook.svg" />}
          ></FacebookLogin>

          <GoogleLogin
            isSignedIn={true}
            clientId="45790515442-clqjotokdi4k0frcbnoi36kpvqj6476v.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            className="my-google-button-class"
            cookiePolicy={"single_host_origin"}
            icon={false}
          >
            <div className="gg-login-inner">
              <img src="/google.svg" />
              <span>Đăng nhập bằng Google</span>
            </div>
          </GoogleLogin>
          <p className="text-sm text-align-center">
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
