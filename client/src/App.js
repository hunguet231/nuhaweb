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
      <div className="body">
        <SliderTop />
        <ProductsList title="Sản phẩm mới nhất" />
      </div>
    </div>
  );
}

export default App;
