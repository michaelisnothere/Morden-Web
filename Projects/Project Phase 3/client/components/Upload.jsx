import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Upload = () => {
  const [postType, setPostType] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/articles")
      .then(console.log("Articles fetched"))
      .catch((err) => console.error("error", err));
  }, []);

  return (
    <div className="container">
      <h1>Upload Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/videos">Videos</Link>
          </li>
          <li>
            <Link to="/pictures">Pictures</Link>
          </li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          <li>
            <Link to="/upload">Upload Post</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Create Account</Link>
          </li>
        </ul>
      </nav>
      <div className="content-section">
        <h2>Upload your own post!</h2>
        <div>
          <label htmlFor="postType">Select Post Type:</label>
          <select
            id="postType"
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="picture">Picture</option>
            <option value="article">Article</option>
            <option value="video">Video</option>
          </select>
        </div>
        <button>Upload</button>
      </div>
      <div className="content-section">
        <p>Posts uploaded will go to respective categories</p>
      </div>
      <footer>
        <p>Place Holder for important links</p>
      </footer>
    </div>
  );
};

export default Upload;
