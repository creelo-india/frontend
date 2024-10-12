import React from "react";
import "./NewArrivals.scss";

const NewArrivals = () => {
  // Sample data for new arrivals
  const newArrivals = [
    {
      id: 1,
      name: "Contemporary Kitchen Faucet",
      price: "$129.99",
      imageUrl: "/images/new-arrival1.jpg",
    },
    {
      id: 2,
      name: "Luxury Bathroom Mirror",
      price: "$199.99",
      imageUrl: "/images/new-arrival2.jpg",
    },
    {
      id: 3,
      name: "Elegant Bathtub",
      price: "$799.99",
      imageUrl: "/images/new-arrival3.jpg",
    },
    {
      id: 4,
      name: "Smart Shower Panel",
      price: "$349.99",
      imageUrl: "/images/new-arrival4.jpg",
    },
  ];

  return (
    <div className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="products-grid">
        {newArrivals.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <button className="view-details-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
