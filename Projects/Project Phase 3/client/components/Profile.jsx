import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../shared/styles.css';
import {
  getAuther,
  logout,
  getCurrentUser,
} from "../../server/authenticator/auth";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch("http://localhost:8000/profile", {
          method: "GET",
          headers: {
            ...getAuther(),
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
          alert("Failed to fetch user info. Logging out...");
          handleLogout();
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/");
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
    try {
      const res = await fetch("http://localhost:8000/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuther(),
        },
        body: JSON.stringify(editedInfo),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUserInfo(updatedUser.user);
        setIsEditing(false);
        console.log("Profile updated successfully");
        const currentUser = getCurrentUser();
        if (currentUser) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...currentUser,
              username: editedInfo.username,
              email: editedInfo.email,
            })
          );
        }
      } else {
        const errorData = await res.json();
        console.error("Failed to update profile:", errorData.error);
        if (res.status === 400 || res.status === 401) {
          handleLogout();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch("http://localhost:8000/profile", {
        method: "DELETE",
        headers: {
          ...getAuther(),
        },
      });

      if (res.ok) {
        console.log("User deleted successfully");
        logout();
        navigate("/");
      }
      else {
        console.error("failed to delete user");
      }
    } catch (err) {
      console.error("Delete account error:", err);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const res = await fetch("http://localhost:8000/profile/comment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuther(),
        },
        body: JSON.stringify({ commentId }),
      });
      if (res.ok) {
        console.log("Comment deleted successfully");
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          comments: prevUserInfo.comments.filter((comment) => comment._id !== commentId),
        }));
      } else {
        console.error("Failed to delete comment");
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  if (loading)
    return (
      <div className="container">
        <div className="content-section">Loading user profile...</div>
      </div>
    );

  return (
    <div className="container">
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
      <div className="user-section">
        <h2>User Comments</h2>
        {userInfo.comments && userInfo.comments.length > 0 ? (
          <ul>
            {userInfo.comments.map((comment) => (
              <div className="comments" key={comment._id}>
                <li>
                  <p>Content Type : {comment.contentType}</p>
                  <p>Comment : {comment.content}</p>
                  <p>Date posted :{new Date(comment.date).toLocaleString()}</p>
                </li>
                <button onClick={() => handleCommentDelete(comment._id)}>
                  Delete
                </button>
              </div>
            ))}
          </ul>
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
