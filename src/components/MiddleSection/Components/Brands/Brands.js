import React from "react";
import "./Brands.scss";

const Brands = () => {
  const brands = [
    {
      id: 1,
      name: "Kohler",
      logoUrl: "https://via.placeholder.com/150?text=Kohler",
      link: "/brands/kohler",
    },
    {
      id: 2,
      name: "Multitubo",
      logoUrl: "https://via.placeholder.com/150?text=Multitubo",
      link: "/brands/multitubo",
    },
    {
      id: 3,
      name: "Viega",
      logoUrl: "https://via.placeholder.com/150?text=Viega",
      link: "/brands/viega",
    },
    {
      id: 4,
      name: "Toto",
      logoUrl: "https://via.placeholder.com/150?text=Toto",
      link: "/brands/toto",
    },
  ];

  return (
    <div className="brands-section">
      <h2>Our Brands</h2>
      <div className="brands-grid">
        {brands.map((brand) => (
          <a key={brand.id} href={brand.link} className="brand-card">
            <div className="brand-logo-container">
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="brand-logo"
                loading="lazy"
              />
              <div className="brand-overlay">
                <span>{brand.name}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Brands;
