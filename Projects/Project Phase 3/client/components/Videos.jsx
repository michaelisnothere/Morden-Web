import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../shared/styles.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const fetchVideos = async (params = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=10&regionCode=US${params}&key=${
          import.meta.env.VITE_YT_API
        }`
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

  const handleSearch = async (search) => {
    try {
      if (!search) {
        alert("Please enter a search term.");
        return;
      }
      setLoading(true);
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${search}&type=video&key=${
          import.meta.env.VITE_YT_API
        }`
      );
      const data = await res.json();
      setVideos(data.items || []);
    } catch (err) {
      console.log("Error searching ", err);
    } finally {
      setLoading(false)
      setSearch('')
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="content-section">
        <h2>Videos</h2>
        <div>
          <ul className="category-menu">
            <li>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
              <button onClick={() => handleSearch(search)}>Search</button>{" "}
            </li>
            <li onClick={fetchPopular}>Popular</li>
            <li onClick={fetchTop}>Entertainment</li>
            <li onClick={fetchMost}>Gaming</li>
            <li onClick={fetchMusic}>Music</li>
            {isLoggedIn && <li onClick={upVideos}>Upload Article</li>}
          </ul>
        </div>
        <p>Here are some interesting videos:</p>
      </div>
      <div className="content-section">
        {videos.map((video) => {
          const videoId = video.id?.videoId || video.id;
          return (
            <div key={videoId} className="video-card">
              <Link to={`/video-details/${videoId}`} state={{ 
                video: {
                  ...video,
                  id: videoId
                } 
              }}>
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                />
              </Link>
              <p>{video.snippet.title}</p>
              <p>Channel: {video.snippet.channelTitle}</p>
              {video.statistics ? (
                <p>{video.statistics.viewCount} views</p>
              ) : (
                <p>No Views Provided</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Videos;