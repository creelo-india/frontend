import React from "react";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import PopularCategories from "./Components/PopularCategories/PopularCategories";
import Categories from "./Components/Categories/Categories";
import Promotions from "./Components/Promotions/Promotions";
import CustomerReviews from "./Components/CustomerReviews/CustomerReviews";
import Newsletter from "./Components/Newsletter/Newsletter";
import TopSellingProducts from "./Components/TopSellingProducts/TopSellingProducts";
import NewArrivals from "./Components/NewArrivals/NewArrivals";
import Brands from "./Components/Brands/Brands";
import CTA from "./Components/CTA/CTA";
import Testimonials from "./Components/Testimonials/Testimonials";
import SocialMediaFeed from "./Components/SocialMediaFeed/SocialMediaFeed";
import Blog from "./Components/Blog/Blog";

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
        <Promotions />
      </section>

      {/* Top-Selling Products Section */}
      <section className="top-selling">
        {/* <h2>Top Selling Products</h2> */}
        <TopSellingProducts />
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals">
        {/* <h2>New Arrivals</h2> */}
        <NewArrivals />
      </section>

      {/* Brands Section */}
      <section className="brands">
        {/* <h2>Our Brands</h2> */}
        <Brands />
      </section>

      {/* Blog/Articles Section */}
      <section className="blog">
        {/* <h2>From Our Blog</h2> */}
        <Blog />
      </section>

      {/* Customer Reviews Section */}
      <section className="customer-reviews">
        {/* <h2>What Our Customers Say</h2> */}
        <CustomerReviews />
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        {/* <h2>Testimonials</h2> */}
        <Testimonials />
      </section>

      {/* CTA Section */}
      <section className="cta">
        {/* <h2>Join Our Community</h2> */}
        <CTA />
      </section>

      {/* Social Media Feed Section */}
      <section className="social-media">
        {/* <h2>Follow Us on Social Media</h2> */}
        <SocialMediaFeed />
      </section>

      {/* Newsletter Subscription */}
      <section className="newsletter">
        {/* <h2>Stay Updated</h2> */}
        <Newsletter />
      </section>
    </main>
  );
};

export default MiddleSection;
