import React from "react";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import Categories from "./Components/Categories/Categories";
import Promotions from "./Components/Promotions/Promotions";
import DealsCarousel from "./Components/DealsCarousel/DealsCarousel";
import ShopByTheme from "./Components/ShopByTheme/ShopByTheme";
import BestSellersIn from "./Components/BestSellersIn/BestSellersIn";
import CustomerReviews from "./Components/CustomerReviews/CustomerReviews";
import Newsletter from "./Components/Newsletter/Newsletter";
import TopSellingProducts from "./Components/TopSellingProducts/TopSellingProducts";
import NewArrivals from "./Components/NewArrivals/NewArrivals";
import Brands from "./Components/Brands/Brands";
import CTA from "./Components/CTA/CTA";
import Testimonials from "./Components/Testimonials/Testimonials";
import SocialMediaFeed from "./Components/SocialMediaFeed/SocialMediaFeed";
import Blog from "./Components/Blog/Blog";
import Footer from "../Footer/Footer";

const MiddleSection = () => {
  return (
    <main className="middle-section-home">
      {/* 1. Four-block promotional grid */}
      <section className="promotions">
        <Promotions />
      </section>

      {/* 2. Deals carousel – Up to 50% off */}
      <section className="deals-carousel">
        <DealsCarousel />
      </section>

      {/* 3. Second four-block row – Shop by theme */}
      <section className="shop-by-theme">
        <ShopByTheme />
      </section>

      {/* 4. New Products – horizontal carousel */}
      <section className="new-arrivals">
        <NewArrivals />
      </section>

      {/* 5. Top Selling Products – horizontal carousel */}
      <section className="top-selling">
        <TopSellingProducts />
      </section>

      {/* 6. Best Sellers in Home & Kitchen */}
      <section className="best-sellers-in">
        <BestSellersIn />
      </section>

      {/* 7. Shop by Category */}
      <section className="categories">
        <Categories />
      </section>

      {/* 8. Featured Products */}
      <section className="featured-products">
        <FeaturedProducts />
      </section>

      {/* 9. Our Brands */}
      <section className="brands">
        <Brands />
      </section>

      {/* 10. Blog */}
      <section className="blog">
        <Blog />
      </section>

      {/* 11. Customer Reviews */}
      <section className="customer-reviews">
        <CustomerReviews />
      </section>

      {/* 12. Testimonials */}
      <section className="testimonials">
        <Testimonials />
      </section>

      {/* 13. CTA banner */}
      <section className="cta">
        <CTA />
      </section>

      {/* 14. Social Media */}
      <section className="social-media">
        <SocialMediaFeed />
      </section>

      {/* 15. Newsletter */}
      <section className="newsletter">
        <Newsletter />
      </section>

      {/* 16. Footer */}
      <Footer />
    </main>
  );
};

export default MiddleSection;
