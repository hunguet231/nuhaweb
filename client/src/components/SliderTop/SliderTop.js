import { Button } from "@material-ui/core";
import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./SliderTop.css";

function SliderTop() {
  const slides = [
    {
      image: "https://i.imgur.com/ZXBtVw7.jpg",
      title: "First item",
      description: "Lorem ipsum",
      button: "More",
    },
    {
      image: "https://i.imgur.com/DCdBXcq.jpg",
      title: "First item",
      description: "Lorem ipsum",
      button: "More",
    },
    {
      image: "https://i.imgur.com/DvmN8Hx.jpg",
      title: "First item",
      description: "Lorem ipsum",
      button: "More",
    },
  ];

  return (
    <div className="slider">
      <Slider autoplay={3000} infinite>
        {slides.map((item, index) => (
          <div
            key={index}
            style={{
              background: `url('${item.image}') no-repeat center center`,
            }}
          >
            <div className="slide-inner">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <Button className="button">{item.button}</Button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderTop;
