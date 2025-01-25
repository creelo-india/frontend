import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, emptyCart, addToCart } from "../../redux/action";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCartDetails, setShowCartDetails] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const cart = useSelector((state) => state.cartData); 
  const items = cart?.items || []; 

 
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  // Fetch cart data
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart());
    }
  }, [isLoggedIn, dispatch]);

  const handleCartClick = () => {
    setShowCartDetails(!showCartDetails);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token"); 
    dispatch(emptyCart()); 
    setIsLoggedIn(false); 
    navigate("/login"); 
  };

  const handleCartAction = (product_id, action) => {
    console.log(`Handling ${action} for product ID: ${product_id}`);
    const payload = {
      product_id,
      action,
      quantity: 1, 
    };

    dispatch(addToCart(payload)); 
  };

  return (
    <div className="header">
      {/* Logo */}
      <Link to="/" className="brand-logo">
        Creelo.in
      </Link>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {/* Authentication Buttons */}
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

      {/* Cart Section */}
      <div className="cart-div" onClick={handleCartClick}>
        <span>{items.length || 0}</span>
        <IoCartOutline />
        {showCartDetails && items.length > 0 && (
          <div className="cart-details">
            <h4>Cart Items</h4>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.product_name}</strong>
                    <p>Product ID: {item.product}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                  </div>
                  <div className="cart-actions">
                    {/* Increase quantity */}
                    <button
                      onClick={() => handleCartAction(item.product, "add")}
                    >
                      +
                    </button>
                    {/* Reduce quantity */}
                    <button
                      onClick={() => handleCartAction(item.product, "reduce")}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    {/* Delete item */}
                    <button
                      onClick={() => handleCartAction(item.product, "delete")}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {/* Cart Total */}
            <div className="cart-total">
              <strong>Total Price: ₹{cart.total_price}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
