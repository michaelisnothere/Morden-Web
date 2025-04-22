import { useState, useEffect } from "react";
import "../shared/styles.css";

const Homepage = () => {
  const [isLogged, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(token !== null);
    if (user) {
      setUsername(user.username);
    }
  }, []);

  return (
    <div className="container">
      <div className="homepage">
        <h1>Welcome to Glimpse 👀 </h1>
        {isLogged ? (
          <h2>Hello again {username}</h2>
        ) : (
          <p>Sign up to access all features</p>
        )}
        <div>
        <p>Connect, share, and discover amazing content</p>
        <p>
          Here is a social media type website. Users will be given the option to
          create a account or browse posts as a guest. Registered users will be
          allowed to upload their own type of post either a video, picture or
          written article that will be posted in their respective categories.
          Guest how ever will not be given the option to upload a post only
          browse and upvote/downvote posts. Logged-in users will be able to see
          their post history, liked posts, comments placed, and engagement on
          posted media.
        </p>
        </div>
        <div className="features">
          <h3>Why Join Our Community?</h3>
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">📷</div>
              <h4>Share Your Content</h4>
              <p>Post photos, videos, or articles</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">👍</div>
              <h4>Engage with Others</h4>
              <p>comment, and discuss on posts that interest you</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h4>Something for Everyone</h4>
              <p>Find intriguing, entertaining or educational media</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
