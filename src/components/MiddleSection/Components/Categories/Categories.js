import React from "react";
import "./Categories.scss";

const Categories = () => {
  // Example category data - replace with dynamic data if needed
  const categories = [
    {
      id: 1,
      name: "Bathroom",
      imageUrl: "/images/bathroom-category.jpg",
      linkUrl: "/categories/bathroom",
    },
    {
      id: 2,
      name: "Plumbing",
      imageUrl: "/images/plumbing-category.jpg",
      linkUrl: "/categories/plumbing",
    },
    {
      id: 3,
      name: "Heating",
      imageUrl: "/images/heating-category.jpg",
      linkUrl: "/categories/heating",
    },
    {
      id: 4,
      name: "Kitchen",
      imageUrl: "/images/kitchen-category.jpg",
      linkUrl: "/categories/kitchen",
    },
  ];

  return (
    <div className="categories-grid">
      {categories.map((category) => (
        <div key={category.id} className="category-card">
          <a href={category.linkUrl}>
            <img src={category.imageUrl} alt={category.name} />
            <h3>{category.name}</h3>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Categories;
