"use client";

import { memo } from "react";
import Image from "next/image";
import { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__image">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="product-card__img"
        />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__price">${product.price.toFixed(2)}</div>
        <div className="product-card__rating">
          <span className="product-card__rating-value">{product.rating}</span>
          <span className="product-card__rating-stars">★</span>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
