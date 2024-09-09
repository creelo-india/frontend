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
    setActiveSubcategory(null);
  };

  const handleMouseEnterSubcategory = (index) => {
    setActiveSubcategory(index);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
    setActiveSubcategory(null);
  };

  return (
    <section className="cat-nav-container">
      <ul className="category-list">
        {categoriesData.map((category, categoryIndex) => (
          <li
            key={categoryIndex}
            onMouseEnter={() => handleMouseEnterCategory(categoryIndex)}
            onMouseLeave={handleMouseLeave}
          >
            {/* <a href={category.link || '#'}>{category.name} <FontAwesomeIcon icon={faChevronDown} /></a> */}
            <p>
              {category.name} <FontAwesomeIcon icon={faChevronDown} />
            </p>
            {activeCategory === categoryIndex && (
              <div className="dropdown-content">
                {category.subcategories.map((subcat, subIndex) => (
                  <div
                    key={subIndex}
                    className="subcategory-item"
                    onMouseEnter={() => handleMouseEnterSubcategory(subIndex)}
                  >
                    <a
                      className={`${
                        activeSubcategory === subIndex && "active"
                      }`}
                      href={subcat.link || "#"}
                    >
                      {subcat.name} <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                    {activeSubcategory === subIndex && (
                      <div className="nested-dropdown-content">
                        {subcat.subcategories.map(
                          (nestedSubcat, nestedIndex) => (
                            <a href={nestedSubcat.link} key={nestedIndex}>
                              {nestedSubcat.name}
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoriesNavigation;
