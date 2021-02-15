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
import Alert from "@material-ui/lab/Alert";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { google, register } from "../actions/userActions";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import "./Register.css";

function Register({ location, history }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [shopName, setShopName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);
  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const userInfo = googleLogin.userInfo
      ? googleLogin.userInfo
      : userLogin.userInfo
      ? userLogin.userInfo
      : userRegister.userInfo;

    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userLogin, userRegister, googleLogin, redirect]);

  const validateServer = () => {
    let errorsServer = {};
    let isValid = true;

    if (error) {
      console.log(error);
      isValid = false;
      errorsServer["username"] = "Tài khoản này đã tồn tại";
    }
    setErrors({ ...errors, ...errorsServer });

    return isValid;
  };

  const validateClient = () => {
    let errorsClient = {};
    let isValid = true;

    if (password !== confirmPassword) {
      isValid = false;
      errorsClient["password"] = "Mật khẩu không khớp nhau";
    }

    setErrors({ ...errors, ...errorsClient });

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(password);

    if (validateClient()) {
      dispatch(register(firstName, lastName, shopName, username, password));
      if (validateServer()) {
        dispatch(register(firstName, lastName, shopName, username, password));
      } else {
        setTimeout(() => {
          setErrors({});
        }, 5000);
      }
    } else {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setErrors({});
      }, 5000);
    }
  };

  // handle social login
  const responseFacebook = (response) => {};

  const responseGoogle = (response) => {
    dispatch(google(response));

    // store in sessionStorage to show toaster
    sessionStorage.setItem("loginMsg", "1");
  };

  const handlePaswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPaswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="register">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img className="register-img" src="/register.svg" />
          <p className="slogan text-align-center">
            Tạo tài khoản trong chốc lát!
          </p>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h3 className="text-align-center">Đăng ký</h3>
          {errors.other && <Alert severity="error">{errors.other}</Alert>}
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
              type="text"
              variant="outlined"
              autoComplete="username"
              label="Tên tài khoản"
              onChange={(e) => {
                setUsername(e.target.value);
                setShopName(e.target.value);
              }}
              required
            />
            {errors.username && (
              <Alert severity="error">{errors.username}</Alert>
            )}
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Mật khẩu
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                value={password}
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

            {errors.password && (
              <Alert severity="error">{errors.password}</Alert>
            )}

            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Nhập lại mật khẩu
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleConfirmPaswordChange}
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
            textButton="Đăng ký với Facebook"
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
              <span>Đăng ký bằng Google</span>
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
