import { Grid } from "@material-ui/core";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./SliderTop.css";

function SliderTop() {
  const myRenderItem = () => {
    return (
      <div>
        <div className="title">Title</div>
        <span style={{ left: "45%" }} className="image-gallery-description">
          Desc
        </span>
      </div>
    );
  };

  const images = [
    {
      original: "/top-banner-1.jpg",
      thumbnail: "/top-banner-1.jpg",
      description: "Đảm bảo bởi NUHA",
    },
    {
      original: "/top-banner-2.jpg",
      thumbnail: "/top-banner-2.jpg",
      description: "Đảm bảo bởi NUHA",
    },
    {
      original: "/top-banner-3.jpg",
      thumbnail: "/top-banner-3.jpg",
      description: "Đảm bảo bởi NUHA",
    },
  ];
  return (
    <div className="slider-top">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <ImageGallery
            autoPlay
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={false}
            showBullets
            swipingTransitionDuration={5000}
            infinite
            lazyLoad
            showNav={false}
            items={images}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img src="/top-banner-4.jpg" alt="" />
            </Grid>
            <Grid item xs={12}>
              <img src="/top-banner-5.jpg" alt="" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SliderTop;
