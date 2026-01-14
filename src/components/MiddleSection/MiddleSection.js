import React, { Suspense, lazy } from "react";

// Lazy load components for better performance - load critical components first
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import PopularCategories from "./Components/PopularCategories/PopularCategories";
import Categories from "./Components/Categories/Categories";

// Lazy load below-the-fold components
const Promotions = lazy(() => import("./Components/Promotions/Promotions"));
const CustomerReviews = lazy(() => import("./Components/CustomerReviews/CustomerReviews"));
const Newsletter = lazy(() => import("./Components/Newsletter/Newsletter"));
const TopSellingProducts = lazy(() => import("./Components/TopSellingProducts/TopSellingProducts"));
const NewArrivals = lazy(() => import("./Components/NewArrivals/NewArrivals"));
const Brands = lazy(() => import("./Components/Brands/Brands"));
const CTA = lazy(() => import("./Components/CTA/CTA"));
const Testimonials = lazy(() => import("./Components/Testimonials/Testimonials"));
const SocialMediaFeed = lazy(() => import("./Components/SocialMediaFeed/SocialMediaFeed"));
const Blog = lazy(() => import("./Components/Blog/Blog"));

// Simple loading placeholder for lazy components
const SectionLoader = () => (
  <div style={{ 
    minHeight: '200px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: '#999'
  }}>
    Loading...
  </div>
);

const MiddleSection = () => {
  return (
    <main>
      {/* Featured Products Section */}
      <section className="featured-products">
        {/* <h2>Featured Products</h2> */}
        <FeaturedProducts />
      </section>

      {/* Popular Categories Section */}
      <section className="popular-categories">
        <PopularCategories />
      </section>

      {/* Categories Section */}
      <section className="categories">
        {/* <h2>Shop by Category</h2> */}
        <Categories />
      </section>

      {/* Promotions Section */}
      <section className="promotions">
        {/* <h2>Special Offers</h2> */}
        <Suspense fallback={<SectionLoader />}>
          <Promotions />
        </Suspense>
      </section>

      {/* Top-Selling Products Section */}
      <section className="top-selling">
        {/* <h2>Top Selling Products</h2> */}
        <Suspense fallback={<SectionLoader />}>
          <TopSellingProducts />
        </Suspense>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals">
        {/* <h2>New Arrivals</h2> */}
        <Suspense fallback={<SectionLoader />}>
          <NewArrivals />
        </Suspense>
      </section>

      {/* Brands Section */}
      <section className="brands">
        {/* <h2>Our Brands</h2> */}
        <Suspense fallback={<SectionLoader />}>
          <Brands />
        </Suspense>
      </section>

      {/* Blog/Articles Section */}
      <section className="blog">
        {/* <h2>From Our Blog</h2> */}
        <Suspense fallback={<SectionLoader />}>
          <Blog />
        </Suspense>
      </section>

      {/* Customer Reviews Section */}
      <section className="customer-reviews">
        {/* <h2>What Our Customers Say</h2> */}
        <Suspense fallback={<SectionLoader />}>
          <CustomerReviews />
        </Suspense>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        {/* <h2>Testimonials</h2> */}
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
      </section>

      {/* CTA Section */}
      <section className="cta">
        {/* <h2>Join Our Community</h2> */}
        <Suspense fallback={<SectionLoader />}>
          <CTA />
        </Suspense>
      </section>

      {/* Social Media Feed Section */}
      <section className="social-media">
        {/* <h2>Follow Us on Social Media</h2> */}
        <Suspense fallback={<SectionLoader />}>
          <SocialMediaFeed />
        </Suspense>
      </section>

      {/* Newsletter Subscription */}
      <section className="newsletter">
        {/* <h2>Stay Updated</h2> */}
        <Suspense fallback={<SectionLoader />}>
          <Newsletter />
        </Suspense>
      </section>
    </main>
  );
};

export default MiddleSection;
