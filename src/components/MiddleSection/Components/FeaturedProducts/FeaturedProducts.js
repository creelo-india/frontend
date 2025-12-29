"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeaturedProducts.scss";

// import { productList } from "./redux/productAction";
// import { useSelector } from "react-redux";
import { productList } from "../../../../redux/productAction";
import { CONFIG } from "../../../../api/config";
import { addToCart, emptyCart, removeToCart } from "../../../../redux/action";

import { useDispatch, useSelector } from "react-redux";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productData);

  useEffect(() => {
    dispatch(productList());
  }, [dispatch]);

  // Initialize displayProducts safely with fallback to empty array
  // Generate placeholder products for empty state
  const placeholderProducts = Array.from({ length: 5 }, (_, index) => ({
    id: `placeholder-${index}`,
    isPlaceholder: true,
  }));

  // Determine if we should show placeholders
  const isPlaceholderMode = (!data || !Array.isArray(data) || data.length === 0);
  
  // Initialize displayProducts with either real data or placeholders, fallback to empty array
  const displayProducts = isPlaceholderMode 
    ? placeholderProducts 
    : (Array.isArray(data) ? data : []);

  // Safely calculate product count
  const productCount = Array.isArray(displayProducts) ? displayProducts.length : 0;

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

  // Carousel configuration
  const slidesToShow = 5;
  const hasEnoughItems = productCount > slidesToShow && !isPlaceholderMode;

  const settings = {
    dots: false,
    infinite: hasEnoughItems,
    speed: 500,
    slidesToShow: Math.min(slidesToShow, productCount),
    slidesToScroll: 1,
    autoplay: autoplay && hasEnoughItems,
    autoplaySpeed: autoplaySpeed,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(4, productCount),
          infinite: productCount > 4 && !isPlaceholderMode,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(3, productCount),
          infinite: productCount > 3 && !isPlaceholderMode,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(2, productCount),
          infinite: productCount > 2 && !isPlaceholderMode,
        },
      },
    ],
    prevArrow: <SamplePrevArrow isPlaceholder={isPlaceholderMode} />,
    nextArrow: <SampleNextArrow isPlaceholder={isPlaceholderMode} />,
  };

  function SamplePrevArrow(props) {
    const { onClick, className, style, isPlaceholder } = props;
    return (
      <button
        type="button"
        className={`arrow left-arrow ${isPlaceholder ? 'placeholder-arrow' : ''} ${className || ''}`}
        onClick={onClick}
        style={style}
        aria-label="Previous products"
        disabled={isPlaceholder || !onClick}
        aria-hidden={isPlaceholder}
      >
        &#10094;
      </button>
    );
  }

  function SampleNextArrow(props) {
    const { onClick, className, style, isPlaceholder } = props;
    return (
      <button
        type="button"
        className={`arrow right-arrow ${isPlaceholder ? 'placeholder-arrow' : ''} ${className || ''}`}
        onClick={onClick}
        style={style}
        aria-label="Next products"
        disabled={isPlaceholder || !onClick}
        aria-hidden={isPlaceholder}
      >
        &#10095;
      </button>
    );
  }

  const handleAddToCart = (product) => {
    console.log("handel submit to cart function is called here", product);
    const payload = {
      product_id: product.id,
      action: "add",
      quantity: 1,
    };

    dispatch(addToCart(payload));
  };

  return (
    <div className="featured-products-section">
      <div className="section-header">
        <h2>Featured Products</h2>
      </div>
      <div className="carousel-container">
        <Slider
          {...settings}
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          {displayProducts.map((product) => (
            <div 
              key={product.id} 
              className={`featured-product-card ${product.isPlaceholder ? 'placeholder-card' : ''}`}
              aria-hidden={product.isPlaceholder}
            >
              {product.isPlaceholder ? (
                <>
                  <div className="product-image-placeholder skeleton-image" aria-hidden="true">
                    <span className="placeholder-icon">📦</span>
                  </div>
                  <div className="product-name-placeholder skeleton-text" aria-hidden="true"></div>
                  <div className="product-price-placeholder skeleton-text skeleton-text-short" aria-hidden="true"></div>
                  <div className="product-description-placeholder skeleton-text skeleton-text-medium" aria-hidden="true"></div>
                  <button className="add-to-cart-btn placeholder-button" disabled aria-hidden="true">
                    Add to Cart
                  </button>
                </>
              ) : (
                <>
                  {/* Product Image with placeholder fallback */}
                  {product.images && product.images[0] && product.images[0].image ? (
                    <img
                      src={`${CONFIG.BASE_URL}${product.images[0].image.replace(
                        /\/$/,
                        ""
                      )}`}
                      alt={product.name || 'Product'}
                      className="product-image"
                    />
                  ) : (
                    <div className="product-image-placeholder" aria-hidden="true">
                      <span className="placeholder-icon">📦</span>
                    </div>
                  )}
                  
                  {/* Product Name */}
                  <h3 className="product-name">{product.name || 'Product Name'}</h3>
                  
                  {/* Product Price */}
                  <p className="product-price">{product.price || '$0.00'}</p>
                  
                  {/* Optional: Description, Availability, Rating */}
                  {product.description && (
                    <p className="product-description">{product.description}</p>
                  )}
                  {product.availability && (
                    <p className="product-availability">{product.availability}</p>
                  )}
                  {product.rating && (
                    <p className="product-rating">
                      {product.rating} stars ({product.reviews || 0} reviews)
                    </p>
                  )}
                  
                  {/* Add to Cart Button */}
                  <button onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedProducts;
