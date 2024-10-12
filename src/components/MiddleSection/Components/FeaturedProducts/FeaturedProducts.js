import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeaturedProducts.scss";

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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="featured-products-section">
      <h2 className="section-title">Featured Products</h2>
      <Slider {...settings} className="carousel-slider">
        {featuredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              {product.badge && (
                <div className={`badge ${product.badge.toLowerCase()}`}>
                  {product.badge}
                </div>
              )}
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p className="price">{product.price}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedProducts;
