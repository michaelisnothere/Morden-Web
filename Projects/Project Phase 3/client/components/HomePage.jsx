import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLogged, setIsLoggedIn] = useState(false);
  // const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token !== null);
  }, []);

  const handleSearch = async () => {
    try {
      fetch("http://localhost:8000/search", { params: { q: searchQuery } });
      console.log("Search results: placeholder");
      // setSearchResults(response.data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };
  //fix search feature and add login functionality site wide

  return (
    <div className="container">
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
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
          {!isLogged ? (
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Create Account</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/upload">Upload Post</Link>
              </li>

              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          )}
        </ul>
      </nav>
      <div className="content-section">
        <h2>This is the home page</h2>
        <p>
          Here is a social media type website. Users will be given the option to
          create a account or browse posts as a guest. Registered users will be
          allowed to upload their own type of post either a video, picture or
          written article that will be posted in their respective categories.
          Guest how ever will not be given the option to upload a post only
          browse and upvote/downvote posts. logged in users will be able to see
          their post history, liked posts, comments placed and engagement on
          posted media.
        </p>
      </div>
      <footer>
        <p>Place Holder for important links</p>
      </footer>
    </div>
  );
};

export default Homepage;
