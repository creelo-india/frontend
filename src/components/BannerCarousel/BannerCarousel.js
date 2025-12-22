"use client";

// BannerCarousel.js
import React from "react";
import { Carousel } from "react-bootstrap";
import "./BannerCarousel.scss";

const BannerCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="/BannerOne.png"
          alt="First banner"
        />
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="/BannerTwo.jpg"
          alt="Second banner"
        />
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="/BannerTwo.jpg"
          alt="Third banner"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default BannerCarousel;
