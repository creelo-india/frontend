import React, { useState } from "react";
import "./CategoriesNavigation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import categoriesData from "./data/categories.json";

const CategoriesNavigation = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const handleMouseEnterCategory = (index) => {
    setActiveCategory(index);
    setActiveSubcategory(0); // Reset subcategory when switching categories
  };

  const handleMouseEnterSubcategory = (index) => {
    setActiveSubcategory(index);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
    setActiveSubcategory(null);
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
        <div
          className="dropdown-content"
          onMouseEnter={() => setActiveCategory(activeCategory)}
          onMouseLeave={handleMouseLeave}
        >
          {categoriesData[activeCategory].subcategories.map(
            (subcat, subIndex) => (
              <div
                key={subcat.name}
                className="subcategory-item"
                onMouseEnter={() => handleMouseEnterSubcategory(subIndex)}
              >
                <a
                  className={activeSubcategory === subIndex ? "active" : ""}
                  href={subcat.link || "#"}
                  aria-expanded={activeSubcategory === subIndex}
                >
                  {subcat.name} <FontAwesomeIcon icon={faChevronRight} />
                </a>
              </div>
            )
          )}
          {activeSubcategory !== null && activeCategory !== null && (
            <div
              className="nested-dropdown-content"
              onMouseEnter={() => setActiveSubcategory(activeSubcategory)}
              onMouseLeave={handleMouseLeave}
            >
              {categoriesData[activeCategory].subcategories[
                activeSubcategory
              ].subcategories.map((nestedSubcat) => (
                <a href={nestedSubcat.link} key={nestedSubcat.name}>
                  {nestedSubcat.name}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CategoriesNavigation;
