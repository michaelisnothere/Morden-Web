const express = require("express");
const router = express.Router();
const User = require("../models/register");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Authentication required" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

router.post("/", authenticateToken, async (req, res) => {
  const { comment, contentType, contentId } = req.body;
  if (!comment) {
    return res.status(400).json({ error: "Comment is required." });
  }

  if (comment.length <= 0) {
    return res.status(400).json({ error: "Comment must have more than 0 characters." });
  } else if (comment.length > 500) {
    return res.status(400).json({ error: "Comment must not exceed 500 characters." });
  }

  if (!contentType || !["video", "article", "picture"].includes(contentType)) {
    return res.status(400).json({ error: "Invalid content type." });
  }

  if (!contentId) {
    return res.status(400).json({ error: "Content ID is required." });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const newComment = {
      content: comment,
      contentType: contentType,
      contentId: contentId,
    };
    user.comments.push(newComment);
    await user.save();
    return res.status(201).json({ message: "Comment posted" });
  } catch (err) {
    console.error("Error saving comment:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/:contentType/:contentId", async (req, res) => {
  const { contentType, contentId } = req.params;
  try {
    const users = await User.find({
      "comments.contentType": contentType,
      "comments.contentId": contentId,
    });
    let allComments = [];
    users.forEach((user) => {
      const userComments = user.comments
        .filter(
          (comment) =>
            comment.contentType === contentType &&
            comment.contentId === contentId
        )
        .map((comment) => ({
          _id: comment._id,
          content: comment.content,
          date: comment.date,
          username: user.username,
          userId: user._id,
        }));

      allComments = [...allComments, ...userComments];
    });
    return res.status(200).json({ comments: allComments });
  } catch (err) {
    console.error("Error fetching comments:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
