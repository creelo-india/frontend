import React, { useState } from "react";
import "./Newsletter.scss";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API call for subscription here
    console.log("Subscribed with:", email);
    setSubmitted(true);
  };

  return (
    <div className="newsletter-section">
      {!submitted ? (
        <>
          <h2>Subscribe to Our Newsletter</h2>
          <p>
            Get the latest updates, promotions, and news directly to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </>
      ) : (
        <h3>Thank you for subscribing!</h3>
      )}
    </div>
  );
};

export default Newsletter;
