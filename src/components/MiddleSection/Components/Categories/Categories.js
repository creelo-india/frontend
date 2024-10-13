import React from "react";
import "./Categories.scss";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Bathroom",
      imageUrl:
        "https://storage-vitraglobal.mncdn.com/mnresize/1920/-/vitra/global/Series/Sento_1.jpg",
      linkUrl: "/categories/bathroom",
    },
    {
      id: 2,
      name: "Plumbing",
      imageUrl:
        "https://theme277-plumbing.myshopify.com/cdn/shop/articles/blog3_1024x1024.jpg?v=1478076141",
      linkUrl: "/categories/plumbing",
    },
    {
      id: 3,
      name: "Heating",
      imageUrl:
        "https://images.victorianplumbing.co.uk/images/2bd65caf-73f4-4fec-b097-6e250ae007d7/847041c1-3c18-4b32-90f2-9e1a8f829b7d/alt-traditional.webp?origin=alt-traditional.png&w=undefined",
      linkUrl: "/categories/heating",
    },
    {
      id: 4,
      name: "Kitchen",
      imageUrl:
        "http://demo.tempload.com/inox/assets/images/photos/welcome/1.jpg",
      linkUrl: "/categories/kitchen",
    },
  ];

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <div key={category.id} className="category-tile">
          <a href={category.linkUrl}>
            <img
              src={category.imageUrl}
              alt={category.name}
              className="category-image"
            />
            <div className="category-info">
              <h3 className="category-title">{category.name}</h3>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Categories;
