"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import styles from "./TopBar.module.scss";

const TopBar = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const currencyRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setShowCurrencyDropdown(false);
      }
    };

    if (showCurrencyDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCurrencyDropdown]);

  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "INR", symbol: "₹" },
  ];

  const socialLinks = [
    {
      icon: FaFacebookF,
      url: "https://facebook.com/troowe",
      label: "Facebook",
    },
    {
      icon: FaTwitter,
      url: "https://twitter.com/troowe",
      label: "Twitter",
    },
    {
      icon: FaLinkedinIn,
      url: "https://linkedin.com/company/troowe",
      label: "LinkedIn",
    },
    {
      icon: FaTiktok,
      url: "https://tiktok.com/@troowe",
      label: "TikTok",
    },
  ];

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency.code);
    setShowCurrencyDropdown(false);
    // Add currency change logic here
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.container}>
        {/* Left Section - Free Shipping Message */}
        <div className={styles.leftSection}>
          <span className={styles.shippingMessage}>
            🔥 Free shipping on all orders above $50
          </span>
        </div>

        {/* Right Section - Social Icons, Currency, Links */}
        <div className={styles.rightSection}>
          {/* Social Media Icons */}
          <div className={styles.socialIcons}>
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className={styles.divider} aria-hidden="true"></div>

          {/* Currency Selector */}
          <div className={styles.currencySelector} ref={currencyRef}>
            <button
              type="button"
              className={styles.currencyButton}
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              aria-expanded={showCurrencyDropdown}
              aria-haspopup="true"
            >
              <span className={styles.currencyCode}>{selectedCurrency}</span>
              <span className={styles.currencySymbol}>
                {currencies.find((c) => c.code === selectedCurrency)?.symbol ||
                  "$"}
              </span>
              <span className={styles.dropdownArrow}>▼</span>
            </button>
            {showCurrencyDropdown && (
              <div className={styles.currencyDropdown}>
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    type="button"
                    className={`${styles.currencyOption} ${
                      selectedCurrency === currency.code ? styles.active : ""
                    }`}
                    onClick={() => handleCurrencyChange(currency)}
                  >
                    <span>{currency.code}</span>
                    <span>{currency.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className={styles.divider} aria-hidden="true"></div>

          {/* Policy Links */}
          <div className={styles.policyLinks}>
            <a href="/refund-policy" className={styles.policyLink}>
              Refund Policy
            </a>
            <a href="/privacy-policy" className={styles.policyLink}>
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
