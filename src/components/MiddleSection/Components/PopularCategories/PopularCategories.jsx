import React, { useState, useEffect } from "react";
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
      image:
        "https://storage-vitraglobal.mncdn.com/mnresize/1920/-/vitra/global/Series/Sento_1.jpg",
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
      image:
        "https://theme277-plumbing.myshopify.com/cdn/shop/articles/blog3_1024x1024.jpg?v=1478076141",
      icon: "🔧",
    },
    {
      id: 4,
      name: "Heating",
      slug: "heating",
      image:
        "https://images.victorianplumbing.co.uk/images/2bd65caf-73f4-4fec-b097-6e250ae007d7/847041c1-3c18-4b32-90f2-9e1a8f829b7d/alt-traditional.webp?origin=alt-traditional.png&w=undefined",
      icon: "🔥",
    },
    {
      id: 5,
      name: "Lighting",
      slug: "lighting",
      image:
        "https://images.victorianplumbing.co.uk/products/kitchens/kitchen-lighting/spotlights/listingimages/kitchens_kitchen-lighting_spotlights.jpg",
      icon: "💡",
      // Fallback image URL in case primary image fails
      fallbackImage:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop&q=80",
      // Additional fallback - use a reliable CDN image
      secondaryFallback: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&q=80",
    },
    {
      id: 6,
      name: "Tiles",
      slug: "tiles",
      image:
        "https://images.victorianplumbing.co.uk/images/150f03fb-e5fd-46c0-881b-537b70474e07/7a2383e4-715e-42cc-b56c-9a6344b06286/wall-tiles-shop-category.jpg",
      icon: "🧱",
    },
    {
      id: 7,
      name: "Accessories",
      slug: "accessories",
      image:
        "https://images.victorianplumbing.co.uk/images/dcb269f8-11a9-4952-a106-e5bed3cc4ef5/c23bbedc-4d78-4d1a-b46d-0837da6dc685/arezzo-matt-black-1.jpg",
      icon: "✨",
    },
    {
      id: 8,
      name: "Fixtures",
      slug: "fixtures",
      image:
        "https://images.victorianplumbing.co.uk/products/arezzo-brushed-brass-round-toilet-roll-holder/mainimages/azbb116_l.jpg",
      icon: "⚙️",
    },
  ];

  // Custom arrow components for carousel
  const PrevArrow = ({ onClick, className }) => (
    <button
      type="button"
      className={`${styles.carouselArrow} ${styles.prevArrow} ${
        className || ""
      }`}
      onClick={onClick}
      aria-label="Previous categories"
    >
      <span aria-hidden="true">‹</span>
    </button>
  );

  const NextArrow = ({ onClick, className }) => (
    <button
      type="button"
      className={`${styles.carouselArrow} ${styles.nextArrow} ${
        className || ""
      }`}
      onClick={onClick}
      aria-label="Next categories"
    >
      <span aria-hidden="true">›</span>
    </button>
  );

  // Carousel settings - horizontal carousel for all screen sizes
  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7, // Desktop: 7-9 items
    slidesToScroll: 3,
    autoplay: false, // Disabled autoplay
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    swipe: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280, // xl breakpoint
        settings: {
          slidesToShow: 7,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024, // lg breakpoint
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // md breakpoint - Tablet
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480, // sm breakpoint - Mobile
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleCategoryClick = (slug) => {
    // Navigation handled by Link component
    console.log(`Navigating to category: ${slug}`);
  };

  const CategoryCard = ({ category }) => {
    const [imageError, setImageError] = useState(false);
    const [fallbackError, setFallbackError] = useState(false);
    const [secondaryFallbackError, setSecondaryFallbackError] = useState(false);
    const [currentImageSrc, setCurrentImageSrc] = useState(
      category.image || null
    );
    const [isLoadingFallback, setIsLoadingFallback] = useState(false);

    // Safety timeout: if image hasn't loaded after 5 seconds, show placeholder
    useEffect(() => {
      if (!category.image || imageError) return;
      
      const timeout = setTimeout(() => {
        // If we're still trying to load the primary image and haven't switched to fallback
        if (currentImageSrc === category.image && !imageError) {
          // Try fallback if available, otherwise show placeholder
          if (category.fallbackImage && !isLoadingFallback) {
            setCurrentImageSrc(category.fallbackImage);
            setImageError(true);
            setIsLoadingFallback(true);
          } else {
            setImageError(true);
            setFallbackError(true);
          }
        }
      }, 5000);

      return () => clearTimeout(timeout);
    }, [category.image, category.fallbackImage, currentImageSrc, imageError, isLoadingFallback]);

    const handleImageError = (e) => {
      // Prevent infinite error loops
      if (imageError && fallbackError && secondaryFallbackError) {
        return;
      }

      // If primary image failed, try fallback
      if (currentImageSrc === category.image && category.fallbackImage && !fallbackError) {
        setIsLoadingFallback(true);
        setCurrentImageSrc(category.fallbackImage);
        setImageError(true);
        return;
      }

      // If fallback failed, try secondary fallback (for Lighting category)
      if (currentImageSrc === category.fallbackImage && category.secondaryFallback && !secondaryFallbackError) {
        setCurrentImageSrc(category.secondaryFallback);
        setFallbackError(true);
        return;
      }

      // All images failed - show placeholder
      setImageError(true);
      if (currentImageSrc === category.fallbackImage || !category.fallbackImage) {
        setFallbackError(true);
      }
      if (currentImageSrc === category.secondaryFallback || !category.secondaryFallback) {
        setSecondaryFallbackError(true);
      }
    };

    const handleFallbackError = (e) => {
      // Try secondary fallback if available
      if (
        category.secondaryFallback &&
        !secondaryFallbackError &&
        currentImageSrc === category.fallbackImage
      ) {
        setCurrentImageSrc(category.secondaryFallback);
        setFallbackError(true);
      } else {
        // All fallbacks failed - show placeholder
        setFallbackError(true);
        setImageError(true);
        if (currentImageSrc === category.secondaryFallback || !category.secondaryFallback) {
          setSecondaryFallbackError(true);
        }
      }
    };

    const handleSecondaryFallbackError = (e) => {
      // All images failed - show placeholder
      setSecondaryFallbackError(true);
      setFallbackError(true);
      setImageError(true);
    };

    // Show placeholder if:
    // 1. No image URL exists, OR
    // 2. All images (primary, fallback, and secondary fallback) have failed to load
    const showPlaceholder =
      !category.image ||
      (imageError && 
       (!category.fallbackImage || fallbackError) &&
       (!category.secondaryFallback || secondaryFallbackError));

    return (
      <a
        href={`/categories/${category.slug}`}
        className={styles.categoryCard}
        onClick={() => handleCategoryClick(category.slug)}
        aria-label={`Browse ${category.name} category`}
      >
        <div className={styles.circularImageContainer}>
          {showPlaceholder ? (
            <div className={styles.circularPlaceholder}>
              <span className={styles.placeholderIcon} aria-hidden="true">
                {category.icon}
              </span>
            </div>
          ) : (
            currentImageSrc && (
              <img
                src={currentImageSrc}
                alt={category.name}
                className={styles.circularImage}
                loading="lazy"
                onError={
                  currentImageSrc === category.secondaryFallback
                    ? handleSecondaryFallbackError
                    : currentImageSrc === category.fallbackImage
                    ? handleFallbackError
                    : handleImageError
                }
                // Add decoding for better performance
                decoding="async"
                // Add fetchpriority for better loading performance
                fetchPriority="low"
              />
            )
          )}
        </div>
        <div className={styles.categoryName}>
          <span>{category.name}</span>
        </div>
      </a>
    );
  };

  return (
    <section
      className={styles.popularCategories}
      aria-labelledby="popular-categories-heading"
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 id="popular-categories-heading" className={styles.heading}>
            Explore Popular Categories
          </h2>
          <a href="/categories" className={styles.viewAllLink}>
            View All &gt;
          </a>
        </div>

        {/* Horizontal Carousel Layout */}
        <div className={styles.carouselContainer}>
          <Slider {...carouselSettings}>
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
