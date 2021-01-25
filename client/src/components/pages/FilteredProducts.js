import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import HomeIcon from "@material-ui/icons/Home";
import SortIcon from "@material-ui/icons/Sort";
import { FormControl, Select, InputLabel } from "@material-ui/core";
import "./FilteredProducts.css";
import { Breadcrumbs, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { filterProducts } from "../../actions/productActions";
import Product from "../Product/Product";
import SkeletonPrdsList from "../skeletons/SkeletonPrdsList";
import cities from "../../ultils/cities";

function FilteredProducts({ location }) {
  const [sort, setSort] = useState("");
  const [city, setCity] = useState("");
  const filter = location.search
    ? "category." + location.search.split("?")[1]
    : "/";

  const dispatch = useDispatch();
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const { loading, error, products } = filteredProducts;

  useEffect(() => {
    dispatch(filterProducts(filter));
  }, [dispatch]);

  return (
    <div className="filtered-products-wrapper">
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          color="inherit"
          to="/"
          style={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon style={{ marginRight: "5px", width: "20", height: "20" }} />
          Trang chủ
        </Link>
        <Link color="inherit" to={`/products?category=${filter.split("=")[1]}`}>
          {decodeURIComponent(filter.split("=")[1])}
        </Link>
      </Breadcrumbs>
      {!loading && (
        <>
          <div className="list-items">
            <div className="sortBy">
              <div className="filter">
                <FormControl>
                  <InputLabel shrink>
                    <div className="d-flex-r">
                      <SortIcon />
                      <span>Sắp xếp</span>
                    </div>
                  </InputLabel>
                  <Select
                    native
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="">Mặc định</option>
                    <option value="Yêu thích"> Yêu thích </option>
                    <option value="Giá(thấp đến cao)">Giá(thấp đến cao)</option>
                    <option value="Giá(cao xuống thấp)">
                      Giá(cao xuống thấp)
                    </option>
                  </Select>
                </FormControl>
              </div>
              <div className="filter">
                <FormControl>
                  <InputLabel shrink>
                    <div className="d-flex-r">
                      <LocationOnOutlinedIcon />
                      <span>Vị trí</span>
                    </div>
                  </InputLabel>
                  <Select
                    native
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Toàn quốc</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <Grid container spacing={2}>
              {products && products.length === 0 && (
                <p>Không có sản phẩm nào!</p>
              )}
              {products &&
                products.map((product) => (
                  <Grid key={product._id} item xs={6} sm={3}>
                    <Product product={product} />
                  </Grid>
                ))}
            </Grid>
          </div>
        </>
      )}
      {loading && <SkeletonPrdsList />}
    </div>
  );
}

export default FilteredProducts;
