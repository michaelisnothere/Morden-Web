import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/videos")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error("error", err));
  }, []);

  const popVideos = () => {
    console.log("Take to popular");
  };
  const trdVideos = () => {
    console.log("Take to popular");
  };
  const rctVideos = () => {
    console.log("Take to popular");
  };
  const upVideos = () => {
    console.log("Take to popular");
  };

  return (
    <div className="container">
      <h1>Videos Page</h1>
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
        <h2>Videos</h2>
        <div>
          <ul className="category-menu">
            <li>
              <input type="text" placeholder="Search"></input>
            </li>
            <li onClick={popVideos}>Popular</li>
            <li onClick={trdVideos}>Trending</li>
            <li onClick={rctVideos}>Recently Uploaded</li>
            <li onClick={upVideos}>Upload Video</li>
          </ul>
        </div>
        <p>heres some interesting videos</p>
      </div>
      <div className="content-section">
        {videos.map((vid, index) => (
          <div key={index} className="item-card">
            <h3>{vid.Title}</h3>
            <p>{vid.Views}</p>
            <p>{vid.DateUpload}</p>
          </div>
        ))}
      </div>
      <footer>
        <p>Place Holder for imporant links</p>
      </footer>
    </div>
  );
};
export default Videos;
