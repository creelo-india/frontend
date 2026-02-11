import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./DealsCarousel.scss";

const DealsCarousel = () => {
  const deals = [
    { id: 1, name: "Cookware set", price: "₹2,499", off: "40% off", imageUrl: "https://via.placeholder.com/200x200?text=Cookware", link: "/product-search" },
    { id: 2, name: "Kitchen tools", price: "₹899", off: "30% off", imageUrl: "https://via.placeholder.com/200x200?text=Kitchen+Tools", link: "/product-search" },
    { id: 3, name: "Storage containers", price: "₹599", off: "25% off", imageUrl: "https://via.placeholder.com/200x200?text=Storage", link: "/product-search" },
    { id: 4, name: "Bathroom fittings", price: "₹1,799", off: "35% off", imageUrl: "https://via.placeholder.com/200x200?text=Bathroom", link: "/category/bathroom" },
    { id: 5, name: "Heating solutions", price: "₹4,999", off: "20% off", imageUrl: "https://via.placeholder.com/200x200?text=Heating", link: "/category/heating" },
  ];

  const [autoplay, setAutoplay] = useState(true);
  const PrevArrow = ({ onClick }) => <div className="deals-arrow left-arrow" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick?.()}>&#10094;</div>;
  const NextArrow = ({ onClick }) => <div className="deals-arrow right-arrow" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick?.()}>&#10095;</div>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="deals-carousel-section">
      <div className="deals-section-head">
        <h2 className="section-heading">Up to 50% off | Cookware, kitchen tools & more</h2>
        <Link to="/product-search" className="deals-see-more">See more</Link>
      </div>
      <div className="deals-slider-wrap" onMouseEnter={() => setAutoplay(false)} onMouseLeave={() => setAutoplay(true)}>
        <Slider {...settings}>
          {deals.map((item) => (
            <div key={item.id} className="deals-card">
              <Link to={item.link} className="deals-card-link">
                <div className="deals-card-image-wrap">
                  {item.imageUrl ? <img src={item.imageUrl} alt={item.name} /> : <div className="deals-card-placeholder">No image</div>}
                </div>
                <p className="deals-card-off">{item.off}</p>
                <p className="deals-card-name">{item.name}</p>
                <p className="deals-card-price">{item.price}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DealsCarousel;
