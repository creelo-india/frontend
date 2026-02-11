import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./NewArrivals.scss";

const NewArrivals = () => {
  const newArrivals = [
    {
      id: 1,
      name: "Contemporary Kitchen Faucet",
      price: "₹9,999",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Contemporary+Kitchen+Faucet",
      category: "Kitchen",
    },
    {
      id: 2,
      name: "Luxury Bathroom Mirror",
      price: "₹14,999",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Luxury+Bathroom+Mirror",
      category: "Bathroom",
    },
    {
      id: 3,
      name: "Elegant Bathtub",
      price: "₹59,999",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Elegant+Bathtub",
      category: "Bathroom",
    },
    {
      id: 4,
      name: "Smart Shower Panel",
      price: "₹24,999",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Smart+Shower+Panel",
      category: "Bathroom",
    },
    {
      id: 5,
      name: "Radiator Heater",
      price: "₹12,499",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Radiator+Heater",
      category: "Heating",
    },
  ];

  const [autoplay, setAutoplay] = useState(true);

  const PrevArrow = ({ onClick }) => (
    <div className="arrow left-arrow" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick?.()}>
      &#10094;
    </div>
  );
  const NextArrow = ({ onClick }) => (
    <div className="arrow right-arrow" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onClick?.()}>
      &#10095;
    </div>
  );

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
    <div className="new-arrivals new-arrivals-carousel">
      <h2 className="section-heading">New Products</h2>
      <div
        className="new-arrivals-slider-wrap"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <Slider {...settings}>
          {newArrivals.map((product) => (
            <div key={product.id} className="new-arrival-card">
              <Link to="/product-search" className="new-arrival-card-link">
                <div className="new-arrival-image-wrap">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="product-image"
                    />
                  ) : (
                    <div className="new-arrival-image-placeholder">No image</div>
                  )}
                </div>
                <h3 className="product-name">{product.name}</h3>
                {product.category && (
                  <p className="product-category">{product.category}</p>
                )}
                <p className="product-price">{product.price}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewArrivals;
