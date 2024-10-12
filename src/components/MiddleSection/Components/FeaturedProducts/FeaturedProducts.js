import React from "react";
import Slider from "react-slick";
import "./FeaturedProducts.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Stylish Bathroom Faucet",
      price: "$199.99",
      imageUrl: "https://via.placeholder.com/300x300?text=Product+1",
      badge: "New",
    },
    {
      id: 2,
      name: "Modern Kitchen Sink",
      price: "$299.99",
      imageUrl: "https://via.placeholder.com/300x300?text=Product+2",
      badge: "Best Seller",
    },
    {
      id: 3,
      name: "Luxury Shower Head",
      price: "$129.99",
      imageUrl: "https://via.placeholder.com/300x300?text=Product+3",
    },
    {
      id: 4,
      name: "Elegant Bathtub",
      price: "$599.99",
      imageUrl: "https://via.placeholder.com/300x300?text=Product+4",
      badge: "On Sale",
    },
    {
      id: 5,
      name: "Ceramic Toilet",
      price: "$349.99",
      imageUrl: "https://via.placeholder.com/300x300?text=Product+5",
    },
    {
      id: 6,
      name: "Classic Bathroom Mirror",
      price: "$79.99",
      imageUrl: "https://via.placeholder.com/300x300?text=Product+6",
    },
  ];

  const settings = {
    dots: false, // Disabling dots
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Time in ms (3 seconds)
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="featured-products-section">
      <h2 className="section-title">Featured Products</h2>
      <Slider {...settings}>
        {featuredProducts.map((product) => (
          <div key={product.id} className="product-card">
            {product.badge && (
              <div className="product-badge">{product.badge}</div>
            )}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom Arrow Components
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px" }}
      onClick={onClick}
    />
  );
};

export default FeaturedProducts;
