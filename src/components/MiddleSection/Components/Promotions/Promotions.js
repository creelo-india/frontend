import React from "react";
import "./Promotions.scss";

const Promotions = () => {
  const promotions = [
    {
      id: 1,
      title: "50% Off on Bathroom Fixtures",
      description:
        "Upgrade your bathroom with stylish fixtures at half the price!",
      imageUrl:
        "https://via.placeholder.com/600x400?text=Bathroom+Fixtures+Sale",
      linkUrl: "/promotions/bathroom-fixtures",
    },
    {
      id: 2,
      title: "Free Shipping on Orders Over $100",
      description: "Shop now and get free shipping on all orders over $100.",
      imageUrl: "https://via.placeholder.com/600x400?text=Free+Shipping",
      linkUrl: "/promotions/free-shipping",
    },
    {
      id: 3,
      title: "Kitchen Sale - Up to 40% Off",
      description:
        "Transform your kitchen with our exclusive sale on appliances and decor.",
      imageUrl: "https://via.placeholder.com/600x400?text=Kitchen+Sale",
      linkUrl: "/promotions/kitchen-sale",
    },
  ];

  return (
    <div className="promotions-section">
      {promotions.map((promo) => (
        <div key={promo.id} className="promotion-card">
          <a href={promo.linkUrl}>
            <img src={promo.imageUrl} alt={promo.title} />
            <div className="promo-content">
              <h3>{promo.title}</h3>
              <p>{promo.description}</p>
              <button>Shop Now</button>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Promotions;
