import React from "react";
import "./CustomerReviews.scss";

const CustomerReviews = () => {
  // Sample customer reviews data - replace with dynamic data if needed
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      review:
        "Excellent product! It exceeded my expectations and arrived faster than expected.",
      avatar: "https://via.placeholder.com/80", // Use a generic user image
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      review:
        "Good quality, but the shipping took a little longer than I hoped.",
      avatar: "https://via.placeholder.com/80", // Use a generic user image
    },
    {
      id: 3,
      name: "Mark Johnson",
      rating: 5,
      review:
        "Amazing experience! I highly recommend this product to anyone looking for quality.",
      avatar: "https://via.placeholder.com/80", // Use a generic user image
    },
  ];

  return (
    <div className="customer-reviews">
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <img src={review.avatar} alt={review.name} className="avatar" />
          <h3>{review.name}</h3>
          <div className="rating">
            {"★".repeat(review.rating)}{" "}
            <span className="grey-stars">{"★".repeat(5 - review.rating)}</span>
          </div>
          <p className="review-text">"{review.review}"</p>
          <button className="appreciate-btn">👍 Appreciate</button>
        </div>
      ))}
    </div>
  );
};

export default CustomerReviews;
