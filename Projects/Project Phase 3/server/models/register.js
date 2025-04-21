const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxLength: 500,
  },
  contentType: {
    type: String,
    required: true,
  },
  contentId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;