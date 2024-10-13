import React, { useState } from "react";
import "./NewArrivals.scss";

const NewArrivals = () => {
  // Sample data for new arrivals with placeholder images
  const newArrivals = [
    {
      id: 1,
      name: "Contemporary Kitchen Faucet",
      price: "$129.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Contemporary+Kitchen+Faucet",
      description: "A sleek faucet to enhance your kitchen's look.",
      rating: 4.5,
      reviews: 50,
    },
    {
      id: 2,
      name: "Luxury Bathroom Mirror",
      price: "$199.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Luxury+Bathroom+Mirror",
      description: "An elegant mirror that adds depth and style.",
      rating: 4.7,
      reviews: 75,
    },
    {
      id: 3,
      name: "Elegant Bathtub",
      price: "$799.99",
      imageUrl: "https://via.placeholder.com/300x300.png?text=Elegant+Bathtub",
      description: "A stunning bathtub for your relaxation.",
      rating: 4.8,
      reviews: 100,
    },
    {
      id: 4,
      name: "Smart Shower Panel",
      price: "$349.99",
      imageUrl:
        "https://via.placeholder.com/300x300.png?text=Smart+Shower+Panel",
      description: "Upgrade your shower experience with smart controls.",
      rating: 4.6,
      reviews: 65,
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleWishlistToggle = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  return (
    <div className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="products-grid">
        {newArrivals.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product)}
          >
            <div className="image-container">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <button
                className={`wishlist-btn ${
                  wishlist.includes(product.id) ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  handleWishlistToggle(product.id);
                }}
              >
                {wishlist.includes(product.id) ? "❤️" : "🤍"} {/* Heart icon */}
              </button>
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <p className="product-rating">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={index < product.rating ? "filled" : ""}
                >
                  ★
                </span>
              ))}
              <span> ({product.reviews} reviews)</span>
            </p>
            <button className="view-details-btn">View Details</button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedProduct.name}</h3>
            <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
            <p>{selectedProduct.description}</p>
            <p className="modal-price">{selectedProduct.price}</p>
            <button className="add-to-cart">Add to Cart</button>
            <button className="close-modal" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
