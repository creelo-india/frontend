import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const cartItems = useSelector((state) => state.cartData || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  let Navigate = useNavigate();

  const primeCategories = [
    "Electronics",
    "Books",
    "Clothing",
    "Home Appliances",
    "Toys",
    "Sports Equipment",
  ];

  // Filter categories based on the search term
  const filteredCategories = searchTerm
    ? primeCategories.filter((category) =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : primeCategories;

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    console.log("Search initiated for:", searchTerm);
    // Add your search functionality here
    // You can trigger a search API call or filter products based on the searchTerm
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="header">
      {/* Brand Logo */}
      <Link to="/" className="brand-logo">
        Creelo.in
      </Link>

      {/* Product Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
        />
        <button type="button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

        {/* Suggestion Box */}
        {showSuggestions && (
          <ul className="suggestion-box">
            {filteredCategories.map((category, index) => (
              <li key={index} onClick={() => handleSuggestionClick(category)}>
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Login Button */}
      <div className="login-button">
        <button onClick={() => Navigate("/login")} type="button">
          Login
        </button>
      </div>

      {/* Cart */}
      <div className="cart-div">
        <span>{cartItems.length}</span>
        <IoCartOutline />
      </div>
    </div>
  );
};

export default Header;
