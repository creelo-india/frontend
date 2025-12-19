import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faPhone,
  faBolt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./MainHeader.module.scss";

const MainHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const categoryRef = useRef(null);

  const categories = [
    "All Categories",
    "Bathroom",
    "Heating",
    "Tiles & Floors",
    "Kitchens",
    "Plumbing",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };

    if (showCategoryDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCategoryDropdown]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Add search functionality here
    console.log("Searching for:", searchTerm);
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          {/* Logo Icon */}
          <div className={styles.logoIcon}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="#FF7A00" />
              <path
                d="M15 15L25 15L23 25L17 25L15 15Z"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
              />
              <circle cx="20" cy="20" r="2" fill="#FF7A00" />
            </svg>
          </div>

          {/* Brand Name */}
          <div className={styles.brandName}>Troowe</div>

          {/* Hamburger Menu */}
          <button
            type="button"
            className={styles.hamburgerButton}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          {/* Category Dropdown */}
          <div className={styles.categoryDropdown} ref={categoryRef}>
            <button
              type="button"
              className={styles.categoryButton}
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              aria-expanded={showCategoryDropdown}
              aria-haspopup="true"
            >
              {selectedCategory}
              <FontAwesomeIcon
                icon={faChevronDown}
                className={styles.dropdownIcon}
              />
            </button>
            {showCategoryDropdown && (
              <div className={styles.categoryMenu}>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.categoryOption} ${
                      selectedCategory === category ? styles.active : ""
                    }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Section - Search Bar */}
        <form className={styles.searchSection} onSubmit={handleSearch}>
          <div className={styles.searchBar}>
            {/* Category Part */}
            <div className={styles.searchCategory}>
              <button
                type="button"
                className={styles.searchCategoryButton}
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                {selectedCategory}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={styles.searchDropdownIcon}
                />
              </button>
            </div>

            {/* Search Input */}
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Search Button */}
            <button type="submit" className={styles.searchButton}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </form>

        {/* Right Section */}
        <div className={styles.rightSection}>
          {/* Phone Icon & Contact Info */}
          <div className={styles.contactInfo}>
            <div className={styles.phoneIcon}>
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className={styles.contactText}>
              <div className={styles.contactTitle}>Call Anytime</div>
              <div className={styles.phoneNumber}>+88 (9800) 6802</div>
            </div>
          </div>

          {/* Buy Now Button */}
          <button type="button" className={styles.buyNowButton}>
            <FontAwesomeIcon icon={faBolt} className={styles.buyNowIcon} />
            Buy Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
