import React, { useState, useEffect } from "react";
import "./CategoriesNavigation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../api/interceptorApi";

// Helper function to convert flat API data (id, name, slug, level, parentId) into nested structure for UI
const buildCategoryTree = (categories) => {
  if (!categories || !Array.isArray(categories)) return [];

  const categoryMap = {};
  categories.forEach((item) => {
    categoryMap[item.id] = {
      id: item.id,
      name: item.name,
      link: item.slug ? `/${item.slug}` : "#",
      children: [],
    };
  });

  const rootCategories = [];
  categories.forEach((item) => {
    const node = categoryMap[item.id];
    if (item.parentId == null) {
      rootCategories.push(node);
    } else {
      const parent = categoryMap[item.parentId];
      if (parent) parent.children.push(node);
    }
  });

  return rootCategories;
};

const CategoriesNavigation = () => {
  const [categories, setCategories] = useState([]);
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);

  useEffect(() => {
    axiosClient
      .get("api/categories")
      .then((response) => {
        const structuredCategories = buildCategoryTree(response.data);
        setCategories(structuredCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleOpenFlyout = () => setFlyoutOpen(true);
  const handleCloseFlyout = () => {
    setFlyoutOpen(false);
    setHoveredCategoryIndex(null);
  };

  // Render level 3 and level 4 (nested under level 2)
  const renderLevel3And4 = (level3Category) => (
    <li key={level3Category.id} className="mega-menu-level-3">
      <a href={level3Category.link || "#"}>{level3Category.name}</a>
      {level3Category.children && level3Category.children.length > 0 && (
        <ul className="mega-menu-level-4">
          {level3Category.children.map((level4Category) => (
            <li key={level4Category.id}>
              <a href={level4Category.link || "#"}>{level4Category.name}</a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  const renderRightPanel = (category) => {
    if (!category) return null;
    return (
      <div className="flyout-right-content">
        {category.children && category.children.length > 0 ? (
          <>
            <div className="flyout-right-columns">
              {category.children.map((level2Category) => (
                <div key={level2Category.id} className="mega-menu-column">
                  <h3 className="mega-menu-heading">
                    <a href={level2Category.link || "#"}>{level2Category.name}</a>
                  </h3>
                  {level2Category.children && level2Category.children.length > 0 ? (
                    <ul className="mega-menu-links">
                      {level2Category.children.map(renderLevel3And4)}
                    </ul>
                  ) : (
                    <ul className="mega-menu-links">
                      <li>
                        <a href={level2Category.link || "#"}>{level2Category.name}</a>
                      </li>
                    </ul>
                  )}
                  <a href={level2Category.link || "#"} className="mega-menu-view-all">
                    View all in {level2Category.name}
                  </a>
                </div>
              ))}
            </div>
            <div className="flyout-right-cta">
              <a href={category.link || "#"} className="mega-menu-view-all">
                View All {category.name}
              </a>
              <a href={category.link || "#"} className="mega-menu-btn">
                All {category.name}
              </a>
            </div>
          </>
        ) : (
          <div className="flyout-right-cta">
            <a href={category.link || "#"} className="mega-menu-btn">
              All {category.name}
            </a>
          </div>
        )}
      </div>
    );
  };

  if (categories.length === 0) return <p className="cat-nav-loading">Loading categories...</p>;

  return (
    <section className="cat-nav-container" onMouseLeave={handleCloseFlyout}>
      <div className="cat-nav-bar">
        <button
          type="button"
          className="flyout-trigger"
          onMouseEnter={handleOpenFlyout}
          aria-expanded={flyoutOpen}
          aria-haspopup="true"
        >
          <FontAwesomeIcon icon={faBars} className="flyout-trigger-icon" />
          <span>Shop by Department</span>
          <FontAwesomeIcon icon={faChevronDown} className="flyout-trigger-chevron" />
        </button>
      </div>

      {flyoutOpen && (
        <div className="flyout-panel">
          <div className="flyout-left">
            {categories.map((category, index) => (
              <a
                key={category.id}
                href={category.link || "#"}
                className={`flyout-left-item ${hoveredCategoryIndex === index ? "active" : ""}`}
                onMouseEnter={() => setHoveredCategoryIndex(index)}
              >
                {category.name}
              </a>
            ))}
          </div>
          <div className="flyout-right">
            {hoveredCategoryIndex !== null
              ? renderRightPanel(categories[hoveredCategoryIndex])
              : (
                <div className="flyout-right-placeholder">
                  <p>Hover over a department to view categories</p>
                </div>
              )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoriesNavigation;
