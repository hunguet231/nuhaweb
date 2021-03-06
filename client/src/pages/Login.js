import {
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, google } from "../actions/userActions";
import "./Login.css";
import Alert from "@material-ui/lab/Alert";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

function Login({ location, history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);

  const { loading, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  // check if user logged in
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const userInfo = googleLogin.userInfo
      ? googleLogin.userInfo
      : userLogin.userInfo;
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userLogin, googleLogin, redirect]);

  // handle social login
  const responseFacebook = (response) => {};

  const responseGoogle = (response) => {
    dispatch(google(response));

    // store in sessionStorage to show toaster
    sessionStorage.setItem("loginMsg", "1");
  };

  // handle regular login
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(username, password));

    // store in sessionStorage to show toaster
    sessionStorage.setItem("loginMsg", "1");
  };

  const handlePaswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img className="login-img" src="/login.svg" />
          <p className="slogan">
            Hệ thống liên kết nguồn hàng với các nhà bán lẻ
          </p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h3 className="text-align-center">Đăng nhập</h3>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              autoComplete="username"
              label="Tên tài khoản"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon style={{ color: "gray" }} />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Mật khẩu
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlinedIcon style={{ color: "gray" }} />
                  </InputAdornment>
                }
                onChange={handlePaswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>

            <Link
              to="/forgot-password"
              className="text-sm"
              style={{ marginTop: "8px", textDecoration: "underline" }}
            >
              Bạn quên mật khẩu?
            </Link>

            <button type="submit" className="submit-btn">
              Đăng nhập{" "}
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
            Bạn chưa có tài khoản?{" "}
            <Link
              style={{ color: "dodgerblue" }}
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Đăng ký
            </Link>
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
