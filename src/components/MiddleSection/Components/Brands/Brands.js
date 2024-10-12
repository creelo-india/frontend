import React from "react";
import "./Brands.scss";

const Brands = () => {
  // Sample data for brand logos
  const brands = [
    {
      id: 1,
      name: "Brand 1",
      logoUrl: "/images/brand1-logo.png",
      link: "/brands/brand1",
    },
    {
      id: 2,
      name: "Brand 2",
      logoUrl: "/images/brand2-logo.png",
      link: "/brands/brand2",
    },
    {
      id: 3,
      name: "Brand 3",
      logoUrl: "/images/brand3-logo.png",
      link: "/brands/brand3",
    },
    {
      id: 4,
      name: "Brand 4",
      logoUrl: "/images/brand4-logo.png",
      link: "/brands/brand4",
    },
  ];

  return (
    <div className="brands-section">
      <h2>Our Brands</h2>
      <div className="brands-grid">
        {brands.map((brand) => (
          <a key={brand.id} href={brand.link} className="brand-card">
            <img src={brand.logoUrl} alt={brand.name} className="brand-logo" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Brands;
