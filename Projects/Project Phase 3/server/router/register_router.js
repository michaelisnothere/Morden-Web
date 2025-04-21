const express = require("express");
const router = express.Router();
const User = require("../models/register");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }
  console.log("Received data:", req.body);
  try {
    console.log("Encrypting password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      password: hashedPassword,
      email: email,
    });
    await newUser.save();
    console.log("User created successfully");
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

module.exports = router;
