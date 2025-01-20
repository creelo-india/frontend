import React, { useState, useEffect } from "react";
import "./CategoriesNavigation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// import axiosClient from "../../api/interceptorApi"; 
import axiosClient from "../../api/interceptorApi";

// Helper function to convert flat data into a nested structure
const buildCategoryTree = (categories) => {
  const categoryMap = {};

  categories.forEach((category) => {
    category.children = [];
    categoryMap[category.id] = category;
  });

  const nestedCategories = [];

  categories.forEach((category) => {
    if (category.parent) {
      categoryMap[category.parent.id]?.children.push(category);
    } else {
      nestedCategories.push(category);
    }
  });

  return nestedCategories;
};

const CategoriesNavigation = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    // Use the axiosClient to make API requests
    axiosClient
      .get("master-config/categories/") 
      .then((response) => {
        const structuredCategories = buildCategoryTree(response.data);
        setCategories(structuredCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleMouseEnterCategory = (index) => setActiveCategory(index);
  const handleMouseLeave = () => setActiveCategory(null);

  // Render category and its subcategories recursively (but not the parent category itself)
  const renderSubcategories = (category) => (
    <div key={category.id} className="subcategory-item">
      <p>
        <a href={category.link || "#"}>{category.name}</a>
        {category.children.length > 0 && (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </p>
      {category.children.length > 0 && (
        <div className="nested-subcategories">
          {category.children.map((child) => renderSubcategories(child))}
        </div>
      )}
    </div>
  );

  if (categories.length === 0) return <p>Loading categories...</p>;

  return (
    <section
      className="cat-nav-container"
      onMouseLeave={handleMouseLeave}
    >
      <ul className="category-list">
        {categories.map((category, index) => (
          <li
            key={category.id}
            onMouseEnter={() => handleMouseEnterCategory(index)}
            className="category-item"
          >
            <p aria-expanded={activeCategory === index}>
              {category.name} <FontAwesomeIcon icon={faChevronDown} />
            </p>

            {/* Show the dropdown content when category is active */}
            {activeCategory === index && (
              <div className="dropdown-content">
                {category.children.length > 0 && (
                  <div className="nested-subcategories">
                    {category.children.map(renderSubcategories)}
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoriesNavigation;
