import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Images = () => {
  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/pictures")
      .then((res) => setPictures(res.data))
      .catch((err) => console.error("error", err));
  }, []);
  return (
    <div className="container">
      <h1>Images Page</h1>
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
        <h2>Images</h2>
        <div>
          <ul className="category-menu">
            <li>
              <input type="text" placeholder="Search"></input>
            </li>
            <li>Popular</li>
            <li>Trending</li>
            <li>Recently Uploaded</li>
            <li>Upload Image</li>
          </ul>
        </div>
        <p>This is where text about Images will go</p>
      </div>
      <div className="content-section">
        {pictures.map((img, index) => (
          <div key={index} className="item-card">
            <h3>{img.Title}</h3>
            <p>{img.Views}</p>
            <p>{img.DateUpload}</p>
          </div>
        ))}
      </div>
      <footer>
        <p>Place Holder for imporant links</p>
      </footer>
    </div>
  );
};
export default Images;
