"use client";

import { memo } from "react";
import styles from "./ProductSkeleton.module.scss";

function ProductSkeleton() {
  return (
    <div className={`product-card ${styles.productSkeleton}`}>
      <div className="product-card__image">
        <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
      </div>
      <div className="product-card__content">
        <div
          className={`${styles.skeleton} ${styles.skeletonText} ${styles.skeletonTitle}`}
        ></div>
        <div
          className={`${styles.skeleton} ${styles.skeletonText} ${styles.skeletonPrice}`}
        ></div>
        <div
          className={`${styles.skeleton} ${styles.skeletonText} ${styles.skeletonRating}`}
        ></div>
      </div>
    </div>
  );
}

export default memo(ProductSkeleton);
