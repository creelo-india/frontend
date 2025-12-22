"use client";

import React from "react";
import styles from "./NavItem.module.scss";

const NavItem = ({ label, isActive, onOpen, onClose }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isActive) {
        onClose?.();
      } else {
        onOpen?.();
      }
    }

    if (event.key === "Escape") {
      onClose?.();
    }
  };

  return (
    <li
      className={`${styles.item} ${isActive ? styles.active : ""}`}
      onMouseEnter={onOpen}
      onFocus={onOpen}
    >
      <button
        type="button"
        className={styles.button}
        aria-expanded={isActive}
        aria-haspopup="true"
        onClick={() => (isActive ? onClose?.() : onOpen?.())}
        onKeyDown={handleKeyDown}
      >
        {label}
      </button>
    </li>
  );
};

export default NavItem;
