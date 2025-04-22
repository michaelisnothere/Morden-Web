const express = require("express");
const router = express.Router();
const User = require("../models/register");
const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "no token" });
  }
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

router.get("/", authToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "server error" });
  }
});

router.put("/", authToken, async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true, runValidators: true }
    ).select("-password");
    if (!updatedUser) {
      return res.status(401).json({ error: "user not found" });
    }
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

router.delete("/", authToken, async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.user.id);
    if (!deleteUser) {
      return res.status(410).json({ error: "user not found" });
    }
    res.status(200).json({ message: "user Deleted" });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/comment", authToken, async (req, res) => {
  try {
    const { commentId } = req.body;
    if (!commentId) {
      return res.status(400).json({ error: "comment not Found" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    user.comments = user.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );
    await user.save();
    res.status(200).json({ message: "comment deleted", user });
  } catch (err) {
    console.log("error deleting comment:", err);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
