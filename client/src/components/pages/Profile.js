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
import { getUserDetails } from "../../actions/userActions";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./Profile.css";

function Profile({ location, history }) {
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

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  // user info
  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);

  const userInfo = googleLogin.userInfo
    ? googleLogin.userInfo
    : userLogin.userInfo;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails("profile"));
      } else {
        console.log(user);
        setFirstName(user.firstName);
        setLastName(user.lastName);
      }
    }
  }, [dispatch, history, userInfo, user]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Mật khẩu không khớp nhau");
      setTimeout(() => setMessage(null), 5000);
    } else {
      // dispatch update profile
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
        <Grid item xs={12} align="center">
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="error">{message}</Alert>}
          <h3>Sửa đổi tài khoản</h3>
          <form onSubmit={handleSubmit}>
            <div className="name">
              <TextField
                value={lastName}
                label="Họ"
                variant="outlined"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <TextField
                value={firstName}
                label="Tên"
                variant="outlined"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <TextField
              value={email}
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

            <button type="submit" className="submit-btn">
              Ghi nhận{" "}
              {loading && (
                <CircularProgress style={{ color: "#fff" }} size={15} />
              )}
            </button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
export default Profile;
