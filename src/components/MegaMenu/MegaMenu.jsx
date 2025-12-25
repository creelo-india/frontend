"use client";

import React, { useEffect, useMemo, useState } from "react";
import NavItem from "./NavItem";
import styles from "./MegaMenu.module.scss";

const MegaMenu = ({ data = [], isMobileMenuOpen, onRequestClose }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeTabs, setActiveTabs] = useState({});

  const activeCategory = useMemo(
    () => data.find((item) => item.id === activeCategoryId),
    [activeCategoryId, data]
  );

  const activeTabIndex = (activeCategory && activeTabs[activeCategory.id]) ?? 0;

  const activeTab =
    activeCategory?.tabs && activeCategory.tabs[activeTabIndex]
      ? activeCategory.tabs[activeTabIndex]
      : activeCategory?.tabs?.[0];

  const closeMenu = () => {
    setActiveCategoryId(null);
    onRequestClose?.();
  };

  const handleCategoryOpen = (id) => {
    setActiveCategoryId(id);
    setActiveTabs((prev) => ({
      ...prev,
      [id]: prev[id] ?? 0,
    }));
  };

  const handleTabChange = (index) => {
    if (!activeCategory) return;
    setActiveTabs((prev) => ({
      ...prev,
      [activeCategory.id]: index,
    }));
  };

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setActiveCategoryId(null);
    }
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`${styles.nav} ${
        isMobileMenuOpen ? styles.open : styles.closed
      }`}
      onMouseLeave={closeMenu}
    >
      <ul className={styles.navList}>
        {data.map((category) => (
          <NavItem
            key={category.id}
            label={category.label}
            isActive={activeCategoryId === category.id}
            onOpen={() => handleCategoryOpen(category.id)}
            onClose={closeMenu}
          />
        ))}
      </ul>

      {activeCategory && activeCategory.tabs?.length > 0 && (
        <div className={styles.dropdown} role="region">
          <div className={styles.container}>
            <div className={styles.tabList} role="tablist">
              {activeCategory.tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${
                    activeTabIndex === index ? styles.activeTab : ""
                  }`}
                  role="tab"
                  aria-selected={activeTabIndex === index}
                  onMouseEnter={() => handleTabChange(index)}
                  onFocus={() => handleTabChange(index)}
                  onClick={() => handleTabChange(index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab && (
              <div className={styles.contentRow} role="tabpanel">
                <div className={styles.columns}>
                  {activeTab.columns?.map((column, columnIndex) => (
                    <div className={styles.column} key={columnIndex}>
                      <h4>
                        <a href={column.link || "#"}>{column.title}</a>
                      </h4>
                      <ul>
                        {column.items?.map((item, idx) => (
                          <li key={idx}>
                            <a href={item.link || "#"}>{item.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className={styles.promo}>
                  {activeCategory.promoImage && (
                    <img
                      src={activeCategory.promoImage}
                      alt={`${activeCategory.label} promotion`}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MegaMenu;
