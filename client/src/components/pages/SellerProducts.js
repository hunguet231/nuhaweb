import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import SortIcon from "@material-ui/icons/Sort";
import "./SellerProducts.css";
import {
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@material-ui/core";
import Axios from "axios";
import { useSelector } from "react-redux";
import ItemManage from "../ItemManage/ItemManage";
import { Link } from "react-router-dom";

function SellerProducts() {
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  // user info
  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);

  const userInfo = googleLogin.userInfo
    ? googleLogin.userInfo
    : userLogin.userInfo;
  const { user } = userInfo;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await Axios.get(
        `/api/v1/users/${user._id}/products?limit=12`
      );
      setProducts(data.data);
      setLoading(false);
    };
    fetchProducts();
  }, [user._id]);

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className="products">
      <div className="header">
        <h4>Sản phẩm của bạn</h4>
        <Link to="/me/sell/products/add">
          <div className="addProduct">
            <AddIcon />
            Thêm sản phẩm
          </div>
        </Link>
      </div>
      <div className="action-top">
        <div className="sortBy">
          <div className="text">
            <SortIcon /> Sắp xếp theo
          </div>
          <FormControl>
            <Select value={sort} onChange={handleChange}>
              <MenuItem value="Tên">Tên</MenuItem>
              <MenuItem value="Thời gian(cũ nhất)">Thời gian(cũ nhất)</MenuItem>
              <MenuItem value="Thời gian(mới nhất)">
                Thời gian(mới nhất)
              </MenuItem>
              <MenuItem value="Yêu thích">Yêu thích</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="searchBox">
          <input type="text" placeholder="Tìm sản phẩm..." />
        </div>
      </div>
      <div className="main">
        {loading && (
          <>
            <CircularProgress size={20} /> Đang tải danh sách sản phẩm
          </>
        )}

        {!loading && products && (
          <>
            <Grid container spacing={3}>
              {products.map((product) => (
                <ItemManage key={product._id} product={product} />
              ))}
            </Grid>
          </>
        )}
      </div>
    </div>
  );
}

export default SellerProducts;
