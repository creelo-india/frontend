import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./PopularCategories.module.scss";

const PopularCategories = () => {
  // Popular categories data structure
  const categories = [
    {
      id: 1,
      name: "Bathroom",
      slug: "bathroom",
      image: "https://storage-vitraglobal.mncdn.com/mnresize/1920/-/vitra/global/Series/Sento_1.jpg",
      icon: "🚿",
    },
    {
      id: 2,
      name: "Kitchen",
      slug: "kitchen",
      image: "http://demo.tempload.com/inox/assets/images/photos/welcome/1.jpg",
      icon: "🍳",
    },
    {
      id: 3,
      name: "Plumbing",
      slug: "plumbing",
      image: "https://theme277-plumbing.myshopify.com/cdn/shop/articles/blog3_1024x1024.jpg?v=1478076141",
      icon: "🔧",
    },
    {
      id: 4,
      name: "Heating",
      slug: "heating",
      image: "https://images.victorianplumbing.co.uk/images/2bd65caf-73f4-4fec-b097-6e250ae007d7/847041c1-3c18-4b32-90f2-9e1a8f829b7d/alt-traditional.webp?origin=alt-traditional.png&w=undefined",
      icon: "🔥",
    },
    {
      id: 5,
      name: "Lighting",
      slug: "lighting",
      image: null, // Will use placeholder
      icon: "💡",
    },
    {
      id: 6,
      name: "Tiles",
      slug: "tiles",
      image: null, // Will use placeholder
      icon: "🧱",
    },
    {
      id: 7,
      name: "Accessories",
      slug: "accessories",
      image: null, // Will use placeholder
      icon: "✨",
    },
    {
      id: 8,
      name: "Fixtures",
      slug: "fixtures",
      image: null, // Will use placeholder
      icon: "⚙️",
    },
  ];

  const [autoplay, setAutoplay] = useState(true);

  // Custom arrow components for carousel
  const PrevArrow = ({ onClick, className }) => (
    <button
      type="button"
      className={`${styles.carouselArrow} ${styles.prevArrow} ${className || ""}`}
      onClick={onClick}
      aria-label="Previous categories"
    >
      <span aria-hidden="true">‹</span>
    </button>
  );

  const NextArrow = ({ onClick, className }) => (
    <button
      type="button"
      className={`${styles.carouselArrow} ${styles.nextArrow} ${className || ""}`}
      onClick={onClick}
      aria-label="Next categories"
    >
      <span aria-hidden="true">›</span>
    </button>
  );

  // Carousel settings for mobile/tablet
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleCategoryClick = (slug) => {
    // Navigation handled by Link component
    console.log(`Navigating to category: ${slug}`);
  };

  const CategoryCard = ({ category }) => (
    <a
      href={`/categories/${category.slug}`}
      className={styles.categoryCard}
      onClick={() => handleCategoryClick(category.slug)}
      aria-label={`Browse ${category.name} category`}
    >
      <div className={styles.cardImageContainer}>
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className={styles.cardImage}
            loading="lazy"
          />
        ) : (
          <div className={styles.cardPlaceholder}>
            <span className={styles.placeholderIcon} aria-hidden="true">
              {category.icon}
            </span>
          </div>
        )}
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{category.name}</h3>
      </div>
    </a>
  );

  return (
    <section className={styles.popularCategories} aria-labelledby="popular-categories-heading">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 id="popular-categories-heading" className={styles.heading}>
            Popular Categories
          </h2>
          <p className={styles.subtitle}>Most loved by our customers</p>
        </div>

        {/* Desktop Grid Layout */}
        <div className={styles.gridContainer}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Mobile/Tablet Carousel Layout */}
        <div className={styles.carouselContainer}>
          <Slider
            {...carouselSettings}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            {categories.map((category) => (
              <div key={category.id} className={styles.carouselSlide}>
                <CategoryCard category={category} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;

