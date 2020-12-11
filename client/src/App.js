import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import MessengerCustomerChat from "react-messenger-customer-chat";
import Navbar from "./components/Navbar/Navbar";
import SliderTop from "./components/SliderTop/SliderTop";
import "./App.css";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ShowList from "./components/ShowList/ShowList";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import Review from "./components/Review/Review";
import Footer from "./components/Footer/Footer";
import TabsSeller from "./components/pages/TabsSeller";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { useSelector } from "react-redux";
import AddProduct from "./components/AddProduct/AddProduct";
import Toaster from "./components/Toaster";
import UpdateShop from "./components/pages/UpdateShop";
import EditProduct from "./components/EditProduct/EditProduct";
import Category from "./components/Category/Category";
import { Detector } from "react-detect-offline";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [online, setOnline] = useState(null);
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
        <div className="header">
          <Navbar />
          {/* <Breadcrumbs /> */}
        </div>
        <div className="body">
          <Route
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
                    <ShowList title="Tất cả sản phẩm" />
                  </div>
                </div>
              </>
            )}
            exact
          />

          <div className="wrapper">
            <div className="showcase">
              <Route path="/login" exact component={Login} />
            </div>

            <div className="showcase">
              <Route path="/register" exact component={Register} />
            </div>
            <div className="showcase">
              <PrivateRoute
                exact
                path="/me/sell/:page"
                component={TabsSeller}
              />
            </div>
            <div className="showcase">
              <PrivateRoute
                exact
                path="/me/sell/products/add"
                component={AddProduct}
              />
            </div>
            <div className="showcase">
              <PrivateRoute
                exact
                path="/products/:slug/edit"
                component={EditProduct}
              />
            </div>
            <div className="showcase">
              <PrivateRoute
                path="/me/update-shop"
                exact
                component={UpdateShop}
              />
            </div>
            <div className="showcase">
              <Route path="/products/:slug" component={ProductDetail} exact />
            </div>
          </div>
          {/* <Route path="/products/:slug/reviews" component={Review} exact /> */}
        </div>

        {/* Toaster */}
        {sessionStorage.getItem("loginMsg") === "1" && userInfo && (
          <Toaster msg={`🚀 Chào mừng ${userInfo.user.firstName}`} />
        )}

        {/* Messenger Chat Button */}
        <MessengerCustomerChat
          pageId="103310781374312"
          appId="659192831443395"
        />

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
                  <Alert onClose={handleClose} severity="success">
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
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
