// BannerCarousel.js
import React from "react";
import { Carousel } from "react-bootstrap";
import "./BannerCarousel.scss";
import BannerImageOne from "../../assets/Teal, Pink & Orange Spring Sale eCommerce Banner.png";

const BannerCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src={BannerImageOne}
          alt="First banner"
        />
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/1600x500?text=Second+Banner"
          alt="Second banner"
        />
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/1600x500?text=Third+Banner"
          alt="Third banner"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default BannerCarousel;
