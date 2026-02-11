import React from "react";
import { Link } from "react-router-dom";
import "./ShopByTheme.scss";

const ShopByTheme = () => {
  const themes = [
    { id: 1, title: "Shop your home in style", desc: "Bathroom, kitchen & more", linkUrl: "/product-search" },
    { id: 2, title: "Get great discounts & 40% off", desc: "Selected categories", linkUrl: "/product-search" },
    { id: 3, title: "Appliances for your home", desc: "Heating & essentials", linkUrl: "/category/heating" },
    { id: 4, title: "Deals on home essentials", desc: "Starting ₹99", linkUrl: "/product-search" },
  ];

  return (
    <div className="shop-by-theme-section">
      <div className="shop-by-theme-inner">
        {themes.map((t) => (
          <Link key={t.id} to={t.linkUrl} className="shop-by-theme-card">
            <h3 className="shop-by-theme-title">{t.title}</h3>
            <p className="shop-by-theme-desc">{t.desc}</p>
            <span className="shop-by-theme-cta">See more</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByTheme;
