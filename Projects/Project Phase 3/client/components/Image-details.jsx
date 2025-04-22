import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuther } from "../../server/authenticator/auth";
import "../shared/styles.css";

const ImageDetails = () => {
  const { id } = useParams();
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPicture = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://pixabay.com/api/?key=${import.meta.env.VITE_PX_API}&id=${id}`
        );
        const pictureData = await res.json();
        setPicture(pictureData.hits[0]);
      } catch (err) {
        console.error("Error fetching picture details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPicture();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/image-details/picture/${id}`
        );
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments || []);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [id]);

  const handleComment = async () => {
    try {
      const res = await fetch("http://localhost:8000/image-details/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuther(),
        },
        body: JSON.stringify({
          comment: userComment,
          contentType: "picture",
          contentId: id,
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        if (res.status === 401) {
          alert("Please log in to comment");
          return;
        }
        console.error("Error posting comment:", error.error);
        return;
      }
      const data = await res.json();
      console.log("Comment posted successfully:", data);
      setUserComment("");

      const commentres = await fetch(
        `http://localhost:8000/image-details/picture/${id}`
      );
      if (commentres.ok) {
        const updatedComments = await commentres.json();
        setComments(updatedComments.comments || []);
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!picture) return <div>No picture found</div>;

  return (
    <div className="container">
      <div className="content-header">
        <h1>Here is a closer look</h1>
      </div>
      <div className="image-details">
        <img
          className="image-thumbnail"
          src={picture?.largeImageURL || "https://via.placeholder.com/400"}
          alt={picture?.tags || "No image available"}
        />
        <div className="image-info">
          <p>
            <strong>Uploader:</strong> {picture.user}
            {picture.userImageURL ? (
              <div className="uploader-profile">
                <img src={picture.userImageURL} alt="Uploader profile" />
              </div>
            ) : (
              <p>No profile picture</p>
            )}
          </p>
          <p>
            <strong>Description:</strong> {picture.tags}
          </p>
          <p>
            <strong>Views:</strong> {picture.views}
          </p>
          <div className="tags">
            {picture.tags.split(",").map((tag, index) => (
              <span key={index} className="tag">
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="comments-section">
        <h1>Comments</h1>
        <input
          type="text"
          placeholder="Add a comment..."
          onChange={(e) => setUserComment(e.target.value)}
          value={userComment}
        />
        <button onClick={handleComment}>Post</button>
        <div className="comments-list">
          <h2>Comments ({comments.length})</h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p className="comment-user">
                  <strong>{comment.username}</strong> •{" "}
                  {new Date(comment.date).toLocaleString()}
                </p>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
