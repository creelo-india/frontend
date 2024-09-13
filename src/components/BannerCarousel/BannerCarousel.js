// BannerCarousel.js
import React from "react";
import { Carousel } from "react-bootstrap";
import "./BannerCarousel.scss";
import BannerOne from "../../assets/BannerOne.png";
import BannerTwo from "../../assets/BannerTwo.jpg";

const BannerCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <img className="d-block w-100" src={BannerOne} alt="First banner" />
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img className="d-block w-100" src={BannerTwo} alt="Second banner" />
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img className="d-block w-100" src={BannerTwo} alt="Third banner" />
      </Carousel.Item>
    </Carousel>
  );
};

export default BannerCarousel;
