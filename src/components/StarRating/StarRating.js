import React from "react";
import "./StarRating.scss"; // Add styles for the star rating

const StarRating = ({ rating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ★
      </span>
    ));

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
