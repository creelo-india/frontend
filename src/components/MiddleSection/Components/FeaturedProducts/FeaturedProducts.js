import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./FeaturedProducts.scss";

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Stylish Bathroom Faucet",
      price: "$199.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Stylish+Bathroom+Faucet",
    },
    {
      id: 2,
      name: "Modern Kitchen Sink",
      price: "$299.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Modern+Kitchen+Sink",
    },
    {
      id: 3,
      name: "Luxury Shower Head",
      price: "$129.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Luxury+Shower+Head",
    },
    {
      id: 4,
      name: "Elegant Bathtub",
      price: "$599.99",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Elegant+Bathtub",
    },
    {
      id: 5,
      name: "Ceramic Toilet",
      price: "$349.99",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Ceramic+Toilet",
    },
    {
      id: 6,
      name: "Classic Bathroom Mirror",
      price: "$79.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Classic+Bathroom+Mirror",
    },
    {
      id: 7,
      name: "Designer Sink",
      price: "$229.99",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Designer+Sink",
    },
    {
      id: 8,
      name: "Smart Shower System",
      price: "$699.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Smart+Shower+System",
    },
  ];

  const [autoplay, setAutoplay] = useState(true);
  const [autoplaySpeed] = useState(3000);

  useEffect(() => {
    const timer = setInterval(() => {
      if (autoplay) {
        setAutoplay(true);
      }
    }, autoplaySpeed);

    return () => clearInterval(timer);
  }, [autoplay, autoplaySpeed]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrow left-arrow" onClick={onClick}>
        &#10094;
      </div>
    );
  }

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrow right-arrow" onClick={onClick}>
        &#10095;
      </div>
    );
  }

  return (
    <div className="featured-products-section">
      <h2>Featured Products</h2>
      <Slider
        {...settings}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        {featuredProducts.map((product) => (
          <div key={product.id} className="featured-product-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedProducts;
