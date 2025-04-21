const express = require("express");
const router = express.Router();
const User = require("../models/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received data:", req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found");
      return res.status(400).json({ error: "No user found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Incorrect password");
      return res.status(400).json({ error: "Incorrect Password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Login Successful");
    return res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
