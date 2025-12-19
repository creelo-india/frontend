import React, { useState } from "react";
import TopBar from "../TopBar/TopBar";
import MainHeader from "../MainHeader/MainHeader";
import MegaMenu from "./MegaMenu";
import menuData from "./menuData";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <TopBar />
      <MainHeader />
      <MegaMenu
        data={menuData}
        isMobileMenuOpen={isMobileMenuOpen}
        onRequestClose={closeMobileMenu}
      />
    </>
  );
};

export default Header;
