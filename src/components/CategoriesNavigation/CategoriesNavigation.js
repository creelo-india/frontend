import React, { useState } from "react";
import "./CategoriesNavigation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import categoriesData from "./data/categories.json";

const CategoriesNavigation = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleMouseEnterCategory = (index) => {
    setActiveCategory(index);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <section className="cat-nav-container" onMouseLeave={handleMouseLeave}>
      <ul className="category-list">
        {categoriesData.map((category, categoryIndex) => (
          <li
            key={category.name}
            onMouseEnter={() => handleMouseEnterCategory(categoryIndex)}
          >
            <p aria-expanded={activeCategory === categoryIndex}>
              {category.name} <FontAwesomeIcon icon={faChevronDown} />
            </p>
          </li>
        ))}
      </ul>

      {activeCategory !== null && (
        <div className="dropdown-content">
          {categoriesData[activeCategory].subcategories.map((subcat) => (
            <div key={subcat.name} className="subcategory-item">
              <a href={subcat.link || "#"}>{subcat.name}</a>

              {/* Nested subcategories */}
              {subcat.subcategories && (
                <div className="nested-subcategories">
                  {subcat.subcategories.map((nestedSubcat) => (
                    <a
                      key={nestedSubcat.name}
                      href={nestedSubcat.link || "#"}
                      className="nested-subcategory-item"
                    >
                      {nestedSubcat.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoriesNavigation;
