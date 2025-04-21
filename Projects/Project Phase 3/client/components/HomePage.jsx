import { useState, useEffect } from "react";
import '../shared/styles.css';

const Homepage = () => {
  const [isLogged, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token !== null);
  }, []);

  return (
    <div className="container">      
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
    </div>
  );
};

export default Homepage;
