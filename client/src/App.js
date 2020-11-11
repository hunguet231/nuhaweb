import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ProductsList from "./components/ProductsList/ProductsList";
import SliderTop from "./components/SliderTop/SliderTop";

function App() {
  return (
    <div className="app">
      <div className="header">
        <Navbar />
      </div>
      <div className="slider">
        <SliderTop />
      </div>
      <div className="wrapper">
        <div className="showcase">
          <ProductsList title="Tất cả sản phẩm" />
        </div>
      </div>
    </div>
  );
}

export default App;
