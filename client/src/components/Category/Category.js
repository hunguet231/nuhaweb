import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { categories } from "../../ultils/categories";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import "./Category.css";

function Category() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          arrows: false,
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="categories-wrapper">
      <div className="title">
        <CategoryOutlinedIcon />
        Danh mục sản phẩm
      </div>
      <Slider {...settings} className="categories">
        {categories.map((category, index) => (
          <Link key={index} to={`/products?category=${category.title}`}>
            <div className="category-item">
              <div
                className="img"
                style={{ backgroundImage: `url(${category.img})` }}
              ></div>
              <p>{category.title}</p>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default Category;
