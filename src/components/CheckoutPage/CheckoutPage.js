import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../../api/interceptorApi";
import { useCart } from "../../context/CartContext";
import "./CheckoutPage.scss";

const CheckoutPage = () => {
  const { items, totalPrice, emptyCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const isLoggedIn = typeof window !== "undefined" && !!localStorage.getItem("token");

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const orderItems = items.map((i) => ({
        vendorProductId: i.vendorProductId,
        quantity: i.quantity,
      }));
      await axiosClient.post("/api/orders", { items: orderItems });
      emptyCart();
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message ?? err.response?.data?.error ?? "Failed to place order. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !submitting) {
    return (
      <div className="checkout-page checkout-empty">
        <p>Your cart is empty.</p>
        <Link to="/product-search">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {!isLoggedIn && (
        <p className="checkout-login-required">
          Please <Link to="/login">log in</Link> to place your order.
        </p>
      )}
      <div className="checkout-items">
        <h2>Order summary</h2>
        <ul>
          {items.map((item) => (
            <li key={item.vendorProductId}>
              <span className="checkout-item-name">{item.name}</span>
              <span className="checkout-item-qty">× {item.quantity}</span>
              <span className="checkout-item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <p className="checkout-total">Total: ₹{totalPrice.toLocaleString()}</p>
      </div>
      {error && <p className="checkout-error">{error}</p>}
      <div className="checkout-actions">
        <button
          type="button"
          className="checkout-submit"
          onClick={handlePlaceOrder}
          disabled={submitting || !isLoggedIn}
        >
          {submitting ? "Placing order..." : "Place order"}
        </button>
        <Link to="/product-search" className="checkout-continue">Continue shopping</Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
