import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./SliderTop.css";

function SliderTop() {
  const images = [
    {
      original: "/banner-1.PNG",
      thumbnail: "/banner-1.PNG",
    },
    {
      original: "/banner-2.PNG",
      thumbnail: "/banner-2.PNG",
    },
    {
      original: "/banner-1.PNG",
      thumbnail: "/banner-1.PNG",
    },
  ];
  return (
    <div className="slider-top">
      <ImageGallery
        autoPlay
        showPlayButton={false}
        showFullscreenButton={false}
        showThumbnails={false}
        showBullets
        swipingTransitionDuration={3000}
        infinite
        lazyLoad
        showNav={false}
        items={images}
      />
    </div>
  );
}

export default SliderTop;
