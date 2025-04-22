import { useState } from "react";
import "../shared/upload.css";

const Upload = () => {
  const [postType, setPostType] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }
    if (!postType) {
      alert("Please select a post type");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("postType", postType);

    try {
      const result = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!result.ok) {
        const error = await result.json();
        console.error(error.message);
        return;
      }
      const data = await result.json();
      console.log(data);
      alert("Upload successful!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="content-header">
        <h1>Wanna Share?</h1>
      </div>
      <div className="content-section">
        <h2>Upload your own post!</h2>
        <div>
          <label htmlFor="postType">Select Post Type:</label>
          <select
            id="postType"
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="picture">Picture</option>
            <option value="article">Article</option>
            <option value="video">Video</option>
          </select>
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div className="content-section">
        <p>Posts uploaded will go to respective categories</p>
      </div>
    </div>
  );
};

export default Upload;
