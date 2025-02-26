import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./TopSellingProducts.scss";
import { productList } from "../../../../redux/productAction";
import { useDispatch, useSelector } from "react-redux";
import { CONFIG } from "../../../../api/config";

const TopSellingProducts = () => {


  const dispatch = useDispatch();
  let data = useSelector((state) => state.productData);
  console.log("top selling product is",data)
  const featuredProducts = data.filter((product) => product.is_featured_product);


  useEffect(() => {
    dispatch(productList());
  }, []);

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
        {featuredProducts.map((product) => (
          <div key={product.id} className="top-selling-product-card">
            {product.images && product.images[0] && product.images[0].image ? (
                   <img
                    src={`${CONFIG.BASE_URL}${product.images[0].image.replace(/\/$/, '')}`} 
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <img
                    src="/path/to/placeholder-image.jpg" 
                    alt="No image available"
                    className="product-image"
                  />
                )}
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
