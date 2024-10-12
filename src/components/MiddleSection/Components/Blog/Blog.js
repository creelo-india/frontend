import React from "react";
import "./Blog.scss";

const Blog = () => {
  // Sample data for blog posts
  const blogPosts = [
    {
      id: 1,
      title: "5 Tips for Choosing the Right Bathroom Fixtures",
      date: "October 1, 2024",
      excerpt:
        "Discover essential tips for selecting the best bathroom fixtures to enhance your space.",
      imageUrl: "/images/blog1.jpg",
      link: "/blog/5-tips-for-choosing-bathroom-fixtures",
    },
    {
      id: 2,
      title: "Trends in Kitchen Design for 2024",
      date: "September 15, 2024",
      excerpt:
        "Explore the latest trends in kitchen design to keep your home stylish and functional.",
      imageUrl: "/images/blog2.jpg",
      link: "/blog/trends-in-kitchen-design-2024",
    },
    {
      id: 3,
      title: "How to Maintain Your Plumbing System",
      date: "August 30, 2024",
      excerpt:
        "Learn how to keep your plumbing system in top shape with these maintenance tips.",
      imageUrl: "/images/blog3.jpg",
      link: "/blog/maintaining-your-plumbing-system",
    },
    {
      id: 4,
      title: "Sustainable Home Renovation Ideas",
      date: "August 20, 2024",
      excerpt:
        "Incorporate sustainable practices in your home renovation projects with these ideas.",
      imageUrl: "/images/blog4.jpg",
      link: "/blog/sustainable-home-renovation-ideas",
    },
  ];

  return (
    <div className="blog-section">
      <h2>Latest Blog Posts</h2>
      <div className="blog-posts">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-post-card">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="blog-post-image"
            />
            <h3 className="blog-post-title">{post.title}</h3>
            <p className="blog-post-date">{post.date}</p>
            <p className="blog-post-excerpt">{post.excerpt}</p>
            <a href={post.link} className="read-more-btn">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
