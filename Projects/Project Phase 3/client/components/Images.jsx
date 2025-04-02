import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { pxAPI } from "./config";

const Images = () => {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch("http://localhost:8000/pictures")
  //     .then((res) => setPictures(res.data))
  //     .catch((err) => console.error("error", err));
  // }, []);

  //stand in for database uploaded images, pixabay will be used to simlate user uploads

  const fetchPictures = async (params = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://pixabay.com/api/?key=${pxAPI}&q=${params}&image_type=photo&per_page=10&order=popular&safesearch=true`
      );
      const data = await res.json();
      setPictures(data.hits || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNature = async () => {
    await fetchPictures("nature");
  };
  const fetchCity = async () => {
    await fetchPictures("city");
  };
  const fetchAnimal = async () => {
    await fetchPictures("animal");
  };

  const fetchPopular = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://pixabay.com/api/?key=${pxAPI}&image_type=photo&per_page=20&order=popular&safesearch=true`
      );
      const data = await res.json();
      setPictures(data.hits || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const upVideos = () => {
    navigate("/upload");
  };

  useEffect(() => {
    fetchPictures();
  }, []);

  if (loading) return <div>Loading...</div>;

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
            <li onClick={fetchPopular}>Popular</li>
            <li onClick={fetchNature}>Nature</li>
            <li onClick={fetchCity}>City Landscapes</li>
            <li onClick={fetchAnimal}>Animals</li>
            <li onClick={upVideos}>Upload Picture</li>
          </ul>
        </div>
        <p>This is where text about Images will go</p>
      </div>
      <div className="content-section">
        {pictures.map((picture) => (
          <div key={picture.id} className="image-card">
            <img
              src={picture.webformatURL}
              alt={picture.tags}
              className="image"
            />
            <p>Tags: {picture.tags}</p>
            <p>User: {picture.user}</p>
            <p>Views: {picture.views}</p>
            <p>Likes: {picture.likes}</p>
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
