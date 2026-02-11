import React from "react";
import { Link } from "react-router-dom";
import "./Categories.scss";

const Categories = () => {
  const categories = [
    { id: 1, name: "Bathroom", slug: "bathroom", imageUrl: "https://storage-vitraglobal.mncdn.com/mnresize/1920/-/vitra/global/Series/Sento_1.jpg" },
    { id: 2, name: "Plumbing", slug: "plumbing", imageUrl: "https://theme277-plumbing.myshopify.com/cdn/shop/articles/blog3_1024x1024.jpg?v=1478076141" },
    { id: 3, name: "Heating", slug: "heating", imageUrl: "https://images.victorianplumbing.co.uk/images/2bd65caf-73f4-4fec-b097-6e250ae007d7/847041c1-3c18-4b32-90f2-9e1a8f829b7d/alt-traditional.webp?origin=alt-traditional.png&w=undefined" },
    { id: 4, name: "Kitchen", slug: "kitchen", imageUrl: "http://demo.tempload.com/inox/assets/images/photos/welcome/1.jpg" },
  ];

  return (
    <div className="categories-container">
      <h2 className="section-heading">Shop by Category</h2>
      <div className="categories-grid">
      {categories.map((category) => (
        <div key={category.id} className="category-tile">
          <Link to={`/category/${category.slug}`}>
            <img
              src={category.imageUrl}
              alt={category.name}
              className="category-image"
            />
            <div className="category-info">
              <h3 className="category-title">{category.name}</h3>
            </div>
          </Link>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Categories;
