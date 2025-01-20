import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [showCartDetails, setShowCartDetails] = useState(false);
  const navigate = useNavigate();

  // Fetch cart data
  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/cart/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCartData(data);
      } else {
        console.error("Failed to fetch cart data.");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // Handle cart actions: increase, reduce, delete
  const handleCartAction = async (productId, action) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/add-to-cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId, action }),
      });

      if (response.ok) {
        fetchCartData(); // Refresh cart data after action
      } else {
        console.error(`Failed to ${action} product in cart.`);
      }
    } catch (error) {
      console.error(`Error performing ${action} action:`, error);
    }
  };

  const handleCartClick = () => {
    setShowCartDetails(!showCartDetails);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="header">
      <Link to="/" className="brand-logo">
        Creelo.in
      </Link>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          onKeyPress={(e) => e.key === "Enter" && console.log("Search:", searchTerm)}
        />
        <button type="button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

        {showSuggestions && (
          <ul className="suggestion-box">
            {["Electronics", "Books", "Clothing", "Home Appliances", "Toys", "Sports Equipment"]
              .filter((cat) =>
                cat.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((cat, index) => (
                <li key={index} onClick={() => setSearchTerm(cat)}>
                  {cat}
                </li>
              ))}
          </ul>
        )}
      </div>

      <div className="auth-button">
        {isLoggedIn ? (
          <button onClick={handleLogout} type="button">
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")} type="button">
            Login
          </button>
        )}
      </div>

      <div className="cart-div" onClick={handleCartClick}>
        <span>{cartData ? cartData.items.length : 0}</span>
        <IoCartOutline />
        {showCartDetails && cartData && (
          <div className="cart-details">
            <h4>Cart Items</h4>
            <ul>
              {cartData.items.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.product_name}</strong>
                    <p>Price: ₹{item.product_price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ₹{item.get_total_price}</p>
                  </div>
                  <div className="cart-actions">
                    <button onClick={() => handleCartAction(item.product, "increase")}>+</button>
                    <button onClick={() => handleCartAction(item.product, "reduce")}>-</button>
                    <button onClick={() => handleCartAction(item.product, "delete")}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            <h5>Total Price: ₹{cartData.total_price}</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
