import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MessengerCustomerChat from "react-messenger-customer-chat";
import Navbar from "./components/Navbar/Navbar";
import SliderTop from "./components/SliderTop/SliderTop";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ShowList from "./components/ShowList/ShowList";
import Footer from "./components/Footer/Footer";
import TabsSeller from "./pages/TabsSeller";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import AddProduct from "./pages/AddProduct/AddProduct";
import Toaster from "./components/Toaster";
import UpdateShop from "./pages/UpdateShop";
import EditProduct from "./pages/EditProduct/EditProduct";
import Category from "./components/Category/Category";
import { Detector } from "react-detect-offline";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Headroom from "react-headroom";
import Profile from "./pages/Profile";
import FilteredProducts from "./pages/FilteredProducts";
import Cart from "./components/Cart/Cart";
import Shipping from "./pages/Shipping/Shipping";
import Payment from "./pages/Payment/Payment";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Order from "./pages/Order/Order";
import ScrollUpBtn from "./components/ScrollUpBtn/ScrollUpBtn";
import "./App.css";
import MyOrders from "./pages/MyOrders/MyOrders";
import UserList from "./pages/UserList/UserList";

function App() {
  // user info
  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);

  const userInfo = googleLogin.userInfo
    ? googleLogin.userInfo
    : userLogin.userInfo;

  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  return (
    <Router>
      <div className="app">
        <Headroom>
          <Navbar />
        </Headroom>
        <div className="body">
          <Route
            exact
            path="/"
            render={(props) => (
              <>
                <div className="slider">
                  <SliderTop />
                </div>
                <div className="wrapper">
                  <div className="showcase">
                    <Category />
                  </div>
                  <div className="showcase">
                    <ShowList color="#ffbe76" title="Gợi ý cho bạn" />
                  </div>
                  <div className="showcase">
                    <img src="/banner-6.jpg" alt="" />
                  </div>
                  <div className="showcase">
                    <ShowList color="#ff7979" title="Top yêu thích" />
                  </div>
                </div>
              </>
            )}
          />

          <div className="wrapper">
            <div className="showcase">
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route exact path="/products" component={FilteredProducts} />
              <Switch>
                <PrivateRoute
                  exact
                  path="/products/:slug/edit"
                  component={EditProduct}
                />
                <Route
                  exact
                  path="/products/:slug/:userId"
                  component={ProductDetail}
                />
              </Switch>
              <PrivateRoute
                exact
                path="/me/sell/:page"
                component={TabsSeller}
              />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/shipping" component={Shipping} />
              <Route exact path="/payment" component={Payment} />
              <Route exact path="/place-order" component={PlaceOrder} />
              <Route exact path="/myorders" component={MyOrders} />
              <Route exact path="/order/:id" component={Order} />
              <Route exact path="/profile" component={Profile} />
              <PrivateRoute
                exact
                path="/me/sell/products/add"
                component={AddProduct}
              />
              <PrivateRoute
                path="/me/update-shop"
                exact
                component={UpdateShop}
              />
              <Route exact path="/admin/users" component={UserList} />
            </div>
          </div>
          {/* <Route path="/products/:slug/reviews" component={Review} exact /> */}
        </div>

        {/* 
        Messenger Chat Button
        <MessengerCustomerChat
          pageId="103310781374312"
          appId="659192831443395"
          language="vi_VN"
        /> */}

        {/* Detect Online/Offline */}
        <Detector
          render={({ online }) => (
            <>
              {!online ? (
                <Snackbar
                  open={open}
                  autoHideDuration={5000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="error">
                    Mất kết nối mạng
                  </Alert>
                </Snackbar>
              ) : (
                ""
              )}
            </>
          )}
        />

        <div className="footer">
          <ScrollUpBtn />
          {/* Toaster */}
          {sessionStorage.getItem("loginMsg") === "1" && userInfo && (
            <Toaster msg={`🚀 Chào mừng ${userInfo.user.firstName}`} />
          )}
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
