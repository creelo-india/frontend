import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./TopSellingProducts.scss";

const TopSellingProducts = () => {
  const topSellingProducts = [
    {
      id: 1,
      name: "Modern Bathroom Faucet",
      price: "$199.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Modern+Bathroom+Faucet",
    },
    {
      id: 2,
      name: "Luxury Shower System",
      price: "$299.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Luxury+Shower+System",
    },
    {
      id: 3,
      name: "Kitchen Sink with Pull Down Sprayer",
      price: "$249.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Kitchen+Sink+with+Pull+Down+Sprayer",
    },
    {
      id: 4,
      name: "Stainless Steel Dishwasher",
      price: "$799.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Stainless+Steel+Dishwasher",
    },
    {
      id: 5,
      name: "Elegant Bathroom Vanity",
      price: "$499.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Elegant+Bathroom+Vanity",
    },
    {
      id: 6,
      name: "Eco-Friendly Toilet",
      price: "$349.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Eco-Friendly+Toilet",
    },
    {
      id: 7,
      name: "Designer Shower Curtain",
      price: "$39.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Designer+Shower+Curtain",
    },
    {
      id: 8,
      name: "Smart Kitchen Faucet",
      price: "$229.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Smart+Kitchen+Faucet",
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
        &#10094; {/* Left arrow symbol */}
      </div>
    );
  }

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrow right-arrow" onClick={onClick}>
        &#10095; {/* Right arrow symbol */}
      </div>
    );
  }

  return (
    <div className="top-selling-products-section">
      <h2>Top Selling Products</h2>
      <Slider
        {...settings}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        {topSellingProducts.map((product) => (
          <div key={product.id} className="top-selling-product-card">
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

export default TopSellingProducts;
