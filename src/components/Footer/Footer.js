import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Footer = () => {
  return (
    <footer className="site-footer">
      <button type="button" className="footer-back-to-top" onClick={scrollToTop}>
        Back to top
      </button>
      <div className="footer-columns">
        <div className="footer-col">
          <h4>Get to Know Us</h4>
          <Link to="/product-search">Shop by category</Link>
          <Link to="/">About Troowe</Link>
          <a href="/#">Careers</a>
          <a href="/#">Press</a>
        </div>
        <div className="footer-col">
          <h4>Connect with Us</h4>
          <a href="/#">Facebook</a>
          <a href="/#">Twitter</a>
          <a href="/#">Instagram</a>
          <a href="/#">Contact Us</a>
        </div>
        <div className="footer-col">
          <h4>Make Money with Us</h4>
          <a href="/#">Sell on Troowe</a>
          <a href="/#">Become an Affiliate</a>
        </div>
        <div className="footer-col">
          <h4>Let Us Help You</h4>
          <Link to="/login">Your Account</Link>
          <Link to="/product-search">Returns & Orders</Link>
          <a href="/#">Shipping & Delivery</a>
          <a href="/#">Help</a>
        </div>
      </div>
      <div className="footer-mid">
        <Link to="/" className="footer-logo">
          troowe.in
        </Link>
        <div className="footer-locale">
          <span className="footer-lang">English</span>
          <span className="footer-country">India</span>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-legal">
          <a href="/#">Conditions of Use</a>
          <a href="/#">Privacy Notice</a>
          <a href="/#">Interest-Based Ads</a>
        </div>
        <span className="footer-copyright">© All Rights Reserved troowe.in</span>
      </div>
    </footer>
  );
};

export default Footer;
