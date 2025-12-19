import React, { useState } from "react";
import MegaMenu from "./MegaMenu";
import menuData from "./menuData";
import TopBar from "../TopBar/TopBar";
import MainHeader from "../MainHeader/MainHeader";
import styles from "./Header.module.scss";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <TopBar />
      <MainHeader />
      <header className={styles.header}>
        <div className={styles.topBar}>
          <div className={styles.brand} aria-label="Creelo home">
            Creelo
          </div>

          <button
            type="button"
            className={`${styles.hamburger} ${
              isMobileMenuOpen ? styles.open : ""
            }`}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={toggleMobileMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <MegaMenu
          data={menuData}
          isMobileMenuOpen={isMobileMenuOpen}
          onRequestClose={closeMobileMenu}
        />
      </header>
    </>
  );
};

export default Header;
