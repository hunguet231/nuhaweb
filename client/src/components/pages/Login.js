import { CircularProgress, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import "./Login.css";
import Alert from "@material-ui/lab/Alert";

function Login({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // DISPATCH LOGIN
    dispatch(login(email, password));

    // STORE IN SESSION STORAGE
    sessionStorage.setItem("loginMsg", "1");
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
        <Grid item xs={12} sm={6} align="center">
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
              Đăng nhập{" "}
              {loading && (
                <CircularProgress style={{ color: "#fff" }} size={15} />
              )}
            </button>
          </form>
          <br />
          <p>Hoặc đăng nhập với</p>
          <div className="fb">
            <img src="/facebook.svg" />
            <p>Facebook</p>
          </div>
          <div className="google">
            <img src="/google.svg" />
            <p>Google</p>
          </div>
          <p>
            Bạn chưa có tài khoản?{" "}
            <Link
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
