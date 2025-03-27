const express = require("express");
const router = express.Router();
const User = require('../models/register')

router.post('/', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).json({ error: "Failed to create user" });
    }
});

module.exports = router;