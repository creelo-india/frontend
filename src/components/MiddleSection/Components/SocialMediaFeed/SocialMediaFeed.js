import React from "react";
import "./SocialMediaFeed.scss";

const SocialMediaFeed = () => {
  // Sample data for social media posts
  const posts = [
    {
      id: 1,
      platform: "Instagram",
      imageUrl: "https://via.placeholder.com/300x200.png?text=Instagram+Post+1",
      caption:
        "Loving our new bathroom fixtures! #HomeImprovement #BathroomGoals",
      link: "https://instagram.com/your_profile/post1",
    },
    {
      id: 2,
      platform: "Facebook",
      imageUrl: "https://via.placeholder.com/300x200.png?text=Facebook+Post+1",
      caption: "Check out our latest kitchen products! #KitchenDesign",
      link: "https://facebook.com/your_profile/post1",
    },
    {
      id: 3,
      platform: "Twitter",
      imageUrl: "https://via.placeholder.com/300x200.png?text=Twitter+Post+1",
      caption: "New arrivals in plumbing supplies! Don’t miss out! #Plumbing",
      link: "https://twitter.com/your_profile/post1",
    },
    {
      id: 4,
      platform: "Instagram",
      imageUrl: "https://via.placeholder.com/300x200.png?text=Instagram+Post+2",
      caption: "Our customers are loving their new kitchens! #HomeDecor",
      link: "https://instagram.com/your_profile/post2",
    },
  ];

  return (
    <div className="social-media-feed-section">
      <h2>Follow Us on Social Media</h2>
      <div className="social-media-posts">
        {posts.map((post) => (
          <div key={post.id} className="social-media-post">
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="post-image"
              />
              <p className="post-caption">{post.caption}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaFeed;
