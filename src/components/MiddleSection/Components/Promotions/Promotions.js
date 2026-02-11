import React from "react";
import "./Promotions.scss";

import { Link } from "react-router-dom";

const Promotions = () => {
  const promotions = [
    {
      id: 1,
      title: "Design your home in style",
      description: "Bathroom & kitchen fixtures",
      linkUrl: "/category/bathroom",
    },
    {
      id: 2,
      title: "Deals on home essentials",
      description: "Up to 50% off selected items",
      linkUrl: "/product-search",
    },
    {
      id: 3,
      title: "Free shipping",
      description: "On orders over ₹2,500",
      linkUrl: "/product-search",
    },
    {
      id: 4,
      title: "Shop & save",
      description: "Kitchen and heating",
      linkUrl: "/category/kitchen",
    },
  ];

  return (
    <div className="promotions-section promotions-four-block">
      <div className="promotions-four-block-inner">
        {promotions.map((promo) => (
          <Link key={promo.id} to={promo.linkUrl} className="promotion-block">
            <h3 className="promotion-block-title">{promo.title}</h3>
            <p className="promotion-block-desc">{promo.description}</p>
            <span className="promotion-block-cta">Shop now</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Promotions;
