import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCartDetails, setShowCartDetails] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const handleCartClick = () => setShowCartDetails(!showCartDetails);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    setIsLoggedIn(false);
    navigate("/login");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/product-search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowCartDetails(false);
    }
  };

  const cartCount = items.reduce((s, i) => s + (i.quantity || 0), 0);

  return (
    <header className="site-header">
      <div className="header-top">
        <Link to="/" className="brand-logo">
          troowe.in
        </Link>
        <div className="header-deliver">
          <span className="header-deliver-icon">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </span>
          <div className="header-deliver-text">
            <span className="header-deliver-label">Deliver to</span>
            <span className="header-deliver-place">India</span>
          </div>
        </div>
        <div className="header-search-row-inline">
          <form className="search-bar" onSubmit={handleSearch}>
            <select className="search-bar-category" aria-label="Search category">
              <option>All</option>
            </select>
            <input
              type="text"
              placeholder="Search troowe.in"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-bar-btn">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
        <div className="header-actions">
          <div className="header-account">
            {isLoggedIn ? (
              <button onClick={handleLogout} type="button" className="header-account-btn">
                Hello, Sign out
              </button>
            ) : (
              <Link to="/login" className="header-account-btn">
                <span className="header-account-label">Hello, Sign in</span>
                <span className="header-account-sub">Account & Lists</span>
              </Link>
            )}
          </div>
          <Link to="/product-search" className="header-returns">
            <span className="header-returns-label">Returns</span>
            <span className="header-returns-sub">& Orders</span>
          </Link>
          <div className="header-cart" onClick={handleCartClick}>
            <span className="header-cart-count">{cartCount}</span>
            <IoCartOutline className="header-cart-icon" />
            <span className="header-cart-label">Cart</span>
          </div>
        </div>
      </div>

      {showCartDetails && items.length > 0 && (
        <div className="cart-details" onClick={(e) => e.stopPropagation()}>
          <h4>Cart Items</h4>
          <ul>
            {items.map((item) => (
              <li key={item.vendorProductId}>
                <div>
                  <strong>{item.name}</strong>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <div className="cart-actions">
                  <button type="button" onClick={() => updateQuantity(item.vendorProductId, item.quantity + 1)}>+</button>
                  <button type="button" onClick={() => updateQuantity(item.vendorProductId, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <button type="button" onClick={() => removeItem(item.vendorProductId)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Total: ₹{totalPrice.toLocaleString()}</strong>
          </div>
          <Link to="/checkout" className="cart-checkout-link" onClick={() => setShowCartDetails(false)}>
            Checkout
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
