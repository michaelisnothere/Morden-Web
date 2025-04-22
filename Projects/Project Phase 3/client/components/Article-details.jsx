import { useLocation } from "react-router-dom";
import { getAuther } from "../../server/authenticator/auth";
import { useEffect, useState } from "react";
import "../shared/detailstyles.css";

const ArticleDetails = () => {
  const { state } = useLocation();
  const { article } = state || {};
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    if (!article) {
      return;
    }
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/article-details/article/${article.url}`
        );
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments || []);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (err) {
        console.log("Error fetching Comments ", err);
      }
    };
    fetchComments();
  }, [article]);

  const handleComment = async () => {
    try {
      const res = await fetch("http://localhost:8000/article-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuther(),
        },
        body: JSON.stringify({
          comment: userComment,
          contentType: "article",
          contentId: article.url,
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
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <div className="container">
      <div className="content-header">
        <h1>{article.title}</h1>
      </div>
      <div className="content-section">
        <img
          className="article-image"
          src={article.urlToImage}
          alt={article.title}
        />
        <h2>author: {article.author}</h2>
        <p>Read more here</p>
        <a href={article.url}>{article.url}</a>
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
            <p style={{ paddingBottom: 20 }}>
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ArticleDetails;
