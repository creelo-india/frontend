import React, { useState, useRef } from "react";
import { FaAngleDown } from "react-icons/fa"; // Import an icon for dropdown indicator
import "./CategoriesNavigation.scss"; // Import your styles

const categories = [
  {
    name: "Bathroom",
    subcategories: [
      {
        name: "Faucets",
        furtherSubcategories: [
          "Sink Faucets",
          "Bathtub Faucets",
          "Shower Faucets",
          "Wall-Mounted Faucets",
        ],
      },
      {
        name: "Vanities",
        furtherSubcategories: [
          "Single Vanities",
          "Double Vanities",
          "Vanity Mirrors",
          "Vanity Sets",
        ],
      },
      {
        name: "Showers",
        furtherSubcategories: ["Showerheads", "Shower Doors", "Shower Panels"],
      },
    ],
  },
  {
    name: "Plumbing",
    subcategories: [
      {
        name: "Pipes",
        furtherSubcategories: [
          "PVC Pipes",
          "Copper Pipes",
          "Galvanized Pipes",
          "PEX Pipes",
        ],
      },
      {
        name: "Fittings",
        furtherSubcategories: ["Elbows", "Tees", "Couplings", "Adapters"],
      },
      {
        name: "Valves",
        furtherSubcategories: ["Ball Valves", "Gate Valves", "Check Valves"],
      },
    ],
  },
  {
    name: "Heating",
    subcategories: [
      {
        name: "Water Heaters",
        furtherSubcategories: [
          "Tankless Water Heaters",
          "Traditional Water Heaters",
          "Heat Pump Water Heaters",
        ],
      },
      {
        name: "Radiators",
        furtherSubcategories: [
          "Baseboard Radiators",
          "Wall-Mounted Radiators",
          "Electric Radiators",
        ],
      },
      {
        name: "Thermostats",
        furtherSubcategories: [
          "Smart Thermostats",
          "Programmable Thermostats",
          "Wi-Fi Thermostats",
        ],
      },
    ],
  },
  {
    name: "Kitchen",
    subcategories: [
      {
        name: "Sinks",
        furtherSubcategories: [
          "Undermount Sinks",
          "Drop-In Sinks",
          "Double Bowl Sinks",
        ],
      },
      {
        name: "Faucets",
        furtherSubcategories: [
          "Pull-Down Faucets",
          "Pull-Out Faucets",
          "Touchless Faucets",
        ],
      },
      {
        name: "Cabinets",
        furtherSubcategories: [
          "Base Cabinets",
          "Wall Cabinets",
          "Corner Cabinets",
        ],
      },
    ],
  },
];

const CategoriesNavigation = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const handleCategoryHover = (category) => {
    setActiveCategory(category);
    setActiveSubcategory(category.subcategories[0]); // Default to first subcategory
  };

  const handleSubcategoryHover = (subcategory) => {
    setActiveSubcategory(subcategory);
  };

  return (
    <div className="categories-navbar">
      <ul className="categories">
        {categories.map((category, index) => (
          <li
            key={index}
            onMouseEnter={() => handleCategoryHover(category)}
            onMouseLeave={() => {
              setActiveCategory(null);
              setActiveSubcategory(null);
            }}
            className={`category ${
              activeCategory === category ? "active" : ""
            }`}
          >
            {category.name}
            <FaAngleDown className="dropdown-icon" />
            {activeCategory === category && (
              <div className="dropdown-container">
                <ul className="subcategories">
                  {category.subcategories.map((subcategory, idx) => (
                    <li
                      key={idx}
                      onMouseEnter={() => handleSubcategoryHover(subcategory)}
                      className={`subcategory ${
                        activeSubcategory === subcategory ? "active" : ""
                      }`}
                    >
                      {subcategory.name}
                      {activeSubcategory === subcategory && (
                        <ul className="further-subcategories">
                          {subcategory.furtherSubcategories.map(
                            (furtherSub, subIndex) => (
                              <li key={subIndex}>{furtherSub}</li>
                            )
                          )}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesNavigation;
