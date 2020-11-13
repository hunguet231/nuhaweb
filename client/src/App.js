import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SliderTop from "./components/SliderTop/SliderTop";
import "./App.css";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ShowList from "./components/ShowList/ShowList";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="header">
          <Navbar />
          <Breadcrumbs />
        </div>
        <Route
          path="/"
          render={(props) => (
            <>
              <div className="slider">
                <SliderTop />
              </div>
              <div className="wrapper">
                <div className="showcase">
                  <ShowList title="Tất cả sản phẩm" />
                </div>
              </div>
            </>
          )}
          exact
        />

        <Route path="/products/:slug" component={ProductDetail} />
      </div>
    </Router>
  );
}

export default App;
