import React from "react";
import "./Testimonials.scss";

const Testimonials = () => {
  // Sample data for testimonials
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback:
        "I love this store! The products are high quality and the delivery was fast.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback: "Fantastic customer service and a wide selection of products.",
      rating: 4,
    },
    {
      id: 3,
      name: "Alice Johnson",
      feedback:
        "The plumbing supplies I ordered arrived quickly and were just what I needed.",
      rating: 5,
    },
    {
      id: 4,
      name: "Mike Brown",
      feedback:
        "I was impressed by the variety of products available. Highly recommend!",
      rating: 4,
    },
  ];

  return (
    <div className="testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-list">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <p className="testimonial-feedback">"{testimonial.feedback}"</p>
            <p className="testimonial-name">- {testimonial.name}</p>
            <p className="testimonial-rating">
              {"⭐".repeat(testimonial.rating)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
