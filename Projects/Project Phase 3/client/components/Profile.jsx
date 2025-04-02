import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Profile = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ username: "", email: "" });
  const navigate = useNavigate();

  // failing to get to profile page while home screen

  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const res = await fetch("http://localhost:8000/profile", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUserInfo(data.user);
          setEditedInfo({
            username: data.user.username,
            email: data.user.email,
          });
        } else {
          console.error("Failed to fetch user info");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    console.log("User logged out");
  };

  const handleSearch = async () => {
    try {
      fetch("http://localhost:8000/search", { params: { q: searchQuery } });
      console.log("Search results: placeholder");
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(editedInfo),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUserInfo(updatedUser.user);
        setIsEditing(false);
        console.log("Profile updated successfully");
      } else {
        console.error("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    console.log("Delete Account Placeholder");
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
    }
    const deletedUser = await fetch("http://localhost:8000/profile", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (deletedUser.ok) {
      console.log("User deleted successfully");
      navigate("/");
    } else {
      console.error("Failed to delete user");
    }
  };

  return (
    <div className="container">
      <h1>Logged in</h1>
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
          <li>
            <Link to="/upload">Upload Post</Link>
          </li>
          <li>
            <Link to="/">Home </Link>
          </li>
        </ul>
      </nav>
      <div className="content-section">
        <h2>This is the profile Page</h2>
        {userInfo ? (
          <div>
            {isEditing ? (
              <div>
                <p>
                  <strong>Username:</strong>{" "}
                  <input
                    type="text"
                    name="username"
                    value={editedInfo.username}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <input
                    type="email"
                    name="email"
                    value={editedInfo.email}
                    onChange={handleInputChange}
                  />
                </p>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleEditToggle}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>
                  <strong>Username:</strong> {userInfo.username}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <button onClick={handleEditToggle}>Edit</button>

                <button onClick={handleDelete}>Delete Account</button>
              </div>
            )}
            <button onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>
      <footer>
        <p>Place Holder for important links</p>
      </footer>
    </div>
  );
};

export default Profile;
