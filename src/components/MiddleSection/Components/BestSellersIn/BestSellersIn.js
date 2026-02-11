import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./BestSellersIn.scss";

const BestSellersIn = () => {
  const items = [
    { id: 1, name: "Faucet set", price: "₹3,499", imageUrl: "https://via.placeholder.com/200x200?text=Faucet", link: "/product-search" },
    { id: 2, name: "Sink unit", price: "₹8,999", imageUrl: "https://via.placeholder.com/200x200?text=Sink", link: "/product-search" },
    { id: 3, name: "Shower panel", price: "₹5,299", imageUrl: "https://via.placeholder.com/200x200?text=Shower", link: "/product-search" },
    { id: 4, name: "Radiator", price: "₹12,999", imageUrl: "https://via.placeholder.com/200x200?text=Radiator", link: "/category/heating" },
    { id: 5, name: "Mirror cabinet", price: "₹4,199", imageUrl: "https://via.placeholder.com/200x200?text=Cabinet", link: "/product-search" },
  ];

  const [autoplay, setAutoplay] = useState(true);
  const PrevArrow = ({ onClick }) => <div className="bs-arrow left-arrow" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick?.()}>&#10094;</div>;
  const NextArrow = ({ onClick }) => <div className="bs-arrow right-arrow" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick?.()}>&#10095;</div>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay,
    autoplaySpeed: 4500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="best-sellers-in-section">
      <div className="bs-section-head">
        <h2 className="section-heading">Best Sellers in Home & Kitchen</h2>
        <Link to="/product-search" className="bs-see-more">See more</Link>
      </div>
      <div className="bs-slider-wrap" onMouseEnter={() => setAutoplay(false)} onMouseLeave={() => setAutoplay(true)}>
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id} className="bs-card">
              <Link to={item.link} className="bs-card-link">
                <div className="bs-card-image-wrap">
                  {item.imageUrl ? <img src={item.imageUrl} alt={item.name} /> : <div className="bs-card-placeholder">No image</div>}
                </div>
                <p className="bs-card-name">{item.name}</p>
                <p className="bs-card-price">{item.price}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSellersIn;
