import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./CarouselPrdsDetail.css";

function CarouselPrdsDetail({ photos }) {
  const images = photos.map((photo) => {
    return { original: photo, thumbnail: photo };
  });
  return (
    <div className="gallery-product">
      <ImageGallery
        lazyLoad
        showIndex
        showBullets
        items={images}
        showThumbnails
        thumbnailPosition="left"
      />
    </div>
  );
}

export default CarouselPrdsDetail;
