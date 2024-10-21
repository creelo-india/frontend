import React, { useState, useEffect } from "react";
import "./CategoriesNavigation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

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
      categoryMap[category.parent]?.children.push(category);
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
    axios
      .get("http://127.0.0.1:8000/master-config/categories/")
      .then((response) => {
        const structuredCategories = buildCategoryTree(response.data);
        setCategories(structuredCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleMouseEnterCategory = (index) => setActiveCategory(index);
  const handleMouseLeave = () => setActiveCategory(null);

  const renderCategories = (category) => (
    <div key={category.id} className="subcategory-item">
      <p>
        <a href={category.link || "#"}>{category.name}</a>
        {category.children.length > 0 && <FontAwesomeIcon icon={faChevronDown} />}
      </p>
      {category.children.length > 0 && (
        <div className="nested-subcategories">
          {category.children.map(renderCategories)}
        </div>
      )}
    </div>
  );

  if (categories.length === 0) return <p>Loading categories...</p>;

  return (
    <section className="cat-nav-container" onMouseLeave={handleMouseLeave}>
      <ul className="category-list">
        {categories.map((category, index) => (
          <li
            key={category.id}
            onMouseEnter={() => handleMouseEnterCategory(index)}
          >
            <p aria-expanded={activeCategory === index}>
              {category.name} <FontAwesomeIcon icon={faChevronDown} />
            </p>
          </li>
        ))}
      </ul>

      {activeCategory !== null && (
        <div className="dropdown-content">
          {renderCategories(categories[activeCategory])}
        </div>
      )}
    </section>
  );
};

export default CategoriesNavigation;
