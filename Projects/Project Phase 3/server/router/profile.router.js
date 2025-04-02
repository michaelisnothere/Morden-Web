const express = require("express");
const router = express.Router();
const User = require("../models/register");
const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        console.log("No token found")
        return res.status(401).json({ error: 'Access Denied'})
    }
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        console.log("Token verified")
        next()
    } catch (err) {
        console.log('Invaild token')
        return res.status(400).json({ error: 'Invalid token'})
    }
}

router.get('/', authToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) {
            console.log("User not found??")
            return res.status(401).json({ error: 'user not found'})
        }
        console.log("User found")
        return res.status(200).json({ user})
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error : 'server error'})
    }
})

router.put('/', authToken, async (req, res) => {
    try {
        const { username, email } = req.body
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { username, email},
            { new: true, runValidators: true }
        ).select('-password')
        if (!updatedUser) {
            console.log("User not found")
            return res.status(401).json({ error: 'user not found'})
        }
        res.status(200).json({ user: updatedUser})
        console.log("User updated")
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'server error'})
    }
})

router.delete('/', authToken, async (req, res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(
            req.user.id)

            if(!deleteUser){
                console.log('user Not Found')
                return res.status(410).json({ error: 'user not found'})
            }
            res.status(200).json({ message: 'user Deleted'})
            console.log('User Deleted')
    } catch (err) {
        console.log(err)
    }
})
module.exports = router;