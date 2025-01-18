import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./FeaturedProducts.scss";
import { useDispatch } from "react-redux";
// import { productList } from "./redux/productAction";
import { useSelector } from "react-redux";
import { productList } from "../../../../redux/productAction";

const FeaturedProducts = () => {

  const dispatch = useDispatch();
  let data = useSelector((state) => state.productData);
  console.warn("######################## product list is", data);

  useEffect(() => {
    dispatch(productList());
  }, []);
  const featuredProducts = [
    {
      id: 1,
      name: "Stylish Bathroom Faucet",
      price: "$199.99",
      description: "A modern faucet designed to enhance any bathroom.",
      availability: "In Stock",
      rating: 4.5,
      reviews: 120,
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Stylish+Bathroom+Faucet",
    },
    {
      id: 2,
      name: "Modern Kitchen Sink",
      price: "$299.99",
      description: "A sleek kitchen sink with a modern design.",
      availability: "In Stock",
      rating: 4.2,
      reviews: 98,
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Modern+Kitchen+Sink",
    },
    {
      id: 3,
      name: "Luxury Shower Head",
      price: "$129.99",
      description:
        "Enjoy a spa-like shower experience with this luxury shower head.",
      availability: "In Stock",
      rating: 4.7,
      reviews: 140,
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Luxury+Shower+Head",
    },
    {
      id: 4,
      name: "Elegant Bathtub",
      price: "$599.99",
      description: "A freestanding bathtub that adds elegance to any bathroom.",
      availability: "Limited Stock",
      rating: 4.8,
      reviews: 75,
      imageUrl: "https://via.placeholder.com/300x300.png?text=Elegant+Bathtub",
    },
    {
      id: 5,
      name: "Ceramic Toilet",
      price: "$349.99",
      description: "A water-saving, high-quality ceramic toilet.",
      availability: "In Stock",
      rating: 4.3,
      reviews: 85,
      imageUrl: "https://via.placeholder.com/300x300.png?text=Ceramic+Toilet",
    },
    {
      id: 6,
      name: "Classic Bathroom Mirror",
      price: "$79.99",
      description: "A classic mirror that complements any bathroom decor.",
      availability: "In Stock",
      rating: 4.1,
      reviews: 65,
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Classic+Bathroom+Mirror",
    },
    {
      id: 7,
      name: "Eco-Friendly Toilet",
      price: "$349.99",
      description: "A sustainable toilet designed for eco-conscious consumers.",
      availability: "In Stock",
      rating: 4.6,
      reviews: 100,
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Eco-Friendly+Toilet",
    },
    {
      id: 8,
      name: "Designer Shower Curtain",
      price: "$39.99",
      description: "A stylish shower curtain with unique patterns.",
      availability: "In Stock",
      rating: 4.2,
      reviews: 112,
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Designer+Shower+Curtain",
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
   {data.map((product) => (
  <div key={product.id} className="featured-product-card">
    {product.images && product.images[0] && product.images[0].image ? (
      <img
        src={`http://localhost:8000${product.images[0].image.replace(/\/$/, '')}`} 
        alt={product.name}
        className="product-image"
      />
    ) : (
      <img
        src="/path/to/placeholder-image.jpg" // Fallback image if no image
        alt="No image available"
        className="product-image"
      />
    )}
    <h3 className="product-name">{product.name}</h3>
    <p className="product-price">{product.price}</p>
    <p className="product-description">{product.description}</p>
    <p className="product-availability">{product.availability}</p>
    <p className="product-rating">
      {product.rating} stars ({product.reviews} reviews)
    </p>
    <button className="add-to-cart-btn">Add to Cart</button>
  </div>
))}




  </Slider>
</div>
  );
};

export default FeaturedProducts;
