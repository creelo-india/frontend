import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CategoriesNavigation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../api/interceptorApi";

// Slug helper – backend may not send slug, so derive from name
const slugify = (name) =>
  (name || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Helper: build tree from flat { id, name, level, parentId }
const buildCategoryTree = (categories) => {
  if (!categories || !Array.isArray(categories)) return [];

  const map = {};
  categories.forEach((item) => {
    const slug = slugify(item.name);
    map[item.id] = {
      id: item.id,
      name: item.name,
      level: item.level,
      parentId: item.parentId,
      slug,
      link: slug ? `/category/${slug}` : "#",
      children: [],
    };
  });

  const roots = [];
  categories.forEach((item) => {
    const node = map[item.id];
    if (!item.parentId) {
      roots.push(node);
    } else if (map[item.parentId]) {
      map[item.parentId].children.push(node);
    }
  });

  return roots;
};

const CategoriesNavigation = () => {
  const [categories, setCategories] = useState([]);
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [navStack, setNavStack] = useState([]); // [] => level 1
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axiosClient
      .get("api/categories")
      .then((response) => {
        const payload = response.data;
        const flat =
          Array.isArray(payload?.data) && payload.success
            ? payload.data
            : Array.isArray(payload)
            ? payload
            : [];
        setCategories(buildCategoryTree(flat));
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load categories.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleTriggerClick = () => {
    setFlyoutOpen((prev) => {
      const next = !prev;
      if (!next) setNavStack([]);
      return next;
    });
  };

  const handleOpenFlyout = () => setFlyoutOpen(true);
  const handleCloseFlyout = () => {
    setFlyoutOpen(false);
    setNavStack([]);
  };

  const currentNode = navStack[navStack.length - 1] || null;
  const currentItems = currentNode ? currentNode.children || [] : categories;
  const currentTitle = currentNode ? currentNode.name : "Main menu";

  const handleItemClick = (item) => {
    if (item.children && item.children.length > 0) {
      // drill down to next level
      setNavStack((stack) => [...stack, item]);
    }
  };

  const handleBack = () => {
    setNavStack((stack) => {
      const next = stack.slice(0, -1);
      if (next.length === 0) {
        // back from level 2 -> close panel
        setFlyoutOpen(false);
      }
      return next;
    });
  };

  if (loading) return <p className="cat-nav-loading">Loading categories...</p>;
  if (error) {
    return (
      <section className="cat-nav-container">
        <div className="cat-nav-bar">
          <p className="cat-nav-error">
            {error}
            <button
              type="button"
              className="cat-nav-retry"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </p>
        </div>
      </section>
    );
  }
  if (categories.length === 0)
    return <p className="cat-nav-loading">No categories available.</p>;

  return (
    <section className="cat-nav-container" onMouseLeave={handleCloseFlyout}>
      <div className="cat-nav-bar">
        <button
          type="button"
          className="flyout-trigger"
          onMouseEnter={handleOpenFlyout}
          onClick={handleTriggerClick}
          aria-expanded={flyoutOpen}
          aria-haspopup="true"
        >
          <FontAwesomeIcon icon={faBars} className="flyout-trigger-icon" />
          <span>Shop by Department</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="flyout-trigger-chevron"
          />
        </button>
      </div>

      {flyoutOpen && (
        <div className="cat-drilldown-panel">
          <div className="cat-drilldown-header">
            {navStack.length > 0 && (
              <button
                type="button"
                className="cat-drilldown-back"
                onClick={handleBack}
              >
                ‹
              </button>
            )}
            <span className="cat-drilldown-title">{currentTitle}</span>
          </div>
          <ul className="cat-drilldown-list">
            {currentItems.map((item) => (
              <li key={item.id}>
                {item.children && item.children.length > 0 ? (
                  <button
                    type="button"
                    className="cat-drilldown-item"
                    onClick={() => handleItemClick(item)}
                  >
                    <span className="cat-drilldown-name">{item.name}</span>
                    <span className="cat-drilldown-arrow">›</span>
                  </button>
                ) : (
                  <Link
                    to={item.link || "#"}
                    className="cat-drilldown-item"
                    onClick={handleCloseFlyout}
                  >
                    <span className="cat-drilldown-name">{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default CategoriesNavigation;
