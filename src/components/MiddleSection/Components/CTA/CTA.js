import React from "react";
import "./CTA.scss";

const CTA = () => {
  // Self-contained data for the CTA
  const title = "Join Our Community!";
  const message =
    "Sign up now and receive exclusive discounts and updates directly to your inbox.";
  const buttonText = "Subscribe Now";
  const buttonLink = "/subscribe";

  return (
    <div className="cta-section">
      <h2>{title}</h2>
      <p>{message}</p>
      <a href={buttonLink} className="cta-button">
        {buttonText}
      </a>
    </div>
  );
};

export default CTA;
