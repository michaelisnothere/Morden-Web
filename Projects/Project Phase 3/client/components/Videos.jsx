import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { ytAPi } from "../components/config.js";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //Stand in for user uploaded videos is the youtube API, simulates user uploads

  const fetchVideos = async (params = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=10&regionCode=US${params}&key=${ytAPi}`
      );
      const data = await res.json();
      setVideos(data.items || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopular = async () => {
    await fetchVideos();
  };

  const fetchTop = async () => {
    await fetchVideos("&videoCategoryId=24");
  };

  const fetchMost = async () => {
    await fetchVideos("&videoCategoryId=20");
  };

  const fetchMusic = async () => {
    await fetchVideos("&videoCategoryId=10");
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  const upVideos = () => {
    navigate("/upload");
  };

  if (loading) return <div>Loading...</div>;

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
            <li onClick={fetchPopular}>Popular</li>
            <li onClick={fetchTop}>Entertainment</li>
            <li onClick={fetchMost}>Gaming</li>
            <li onClick={fetchMusic}>Music</li>
            <li onClick={upVideos}>Upload Video</li>
          </ul>
        </div>
        <p>Here are some interesting videos:</p>
      </div>
      <div className="content-section">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <p>{video.snippet.title}</p>
            <p>Channel: {video.snippet.channelTitle}</p>
            <p>{video.statistics.viewCount} views</p>
          </div>
        ))}
      </div>
      <footer>
        <p>Place Holder for important links</p>
      </footer>
    </div>
  );
};

export default Videos;
