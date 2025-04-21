import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../shared/styles.css';
import { isLoggedIn } from "../../server/authenticator/auth";

const Navigator = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    const handleLoginEvent = () => setLoggedIn(true);
    const handleLogoutEvent = () => setLoggedIn(false);

    window.addEventListener("login", handleLoginEvent);
    window.addEventListener("logout", handleLogoutEvent);

    return () => {
      window.removeEventListener("login", handleLoginEvent);
      window.removeEventListener("logout", handleLogoutEvent);
    };
  }, []);

  return (
    <div className="header">
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
        {loggedIn ? (
          <>
            <li>
              <Link to="/upload">Upload Post</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Create Account</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
    </div>
  );
};

export default Navigator;