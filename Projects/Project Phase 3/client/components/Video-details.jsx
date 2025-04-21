import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuther } from "../../server/authenticator/auth";
import '../shared/styles.css';


const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${
            import.meta.env.VITE_YT_API
          }`
        );
        const videoData = await res.json();
        setVideo(videoData.items[0]);
      } catch (err) {
        console.error("Error fetching video details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/video-details/video/${encodeURIComponent(
            `https://www.youtube.com/watch?v=${id}`
          )}`
        );
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments || []);
        }
      } catch (err) {
        console.log("Error fetching Comments ", err);
      }
    };
    fetchComments();
  }, [id]);

  const handleComment = async () => {
    try {
      const res = await fetch("http://localhost:8000/video-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuther(),
        },
        body: JSON.stringify({
          comment: userComment,
          contentType: "video",
          contentId: `https://www.youtube.com/watch?v=${id}`,
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

      // Fetch updated comments after posting
      const commentres = await fetch(
        `http://localhost:8000/video-details/video/${encodeURIComponent(
          `https://www.youtube.com/watch?v=${id}`
        )}`
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
  if (!video) return <div>No video found</div>;

  return (
    <div className="container">
      <h1>{video.snippet.title}</h1>
      <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
      <p>
        <strong>Channel:</strong> {video.snippet.channelTitle}
      </p>
      <p>
        <strong>Description:</strong> {video.snippet.description}
      </p>
      <p>
        <strong>Views:</strong> {video.statistics.viewCount}
      </p>

      <div className="comments-section">
        <h1>Comments</h1>
        <input
          type="text"
          placeholder="Add a comment..."
          onChange={(e) => setUserComment(e.target.value)}
          value={userComment}
        />
        <button
          onClick={() => {
            console.log("Uploading comment...");
            handleComment();
          }}
        >
          Post
        </button>
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

export default VideoDetails;