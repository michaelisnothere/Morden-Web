require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect(process.env.MONGO_DB);
const db = mongoose.connection;

const registerRouter = require('./router/register_router')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.once('open', () => {
    console.log("Db connected");
});

db.on('error', (err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Home page")
})

app.get('/videos', (req, res) => {
    res.send("videos")
})

app.get('/articles', (req, res) => {
    res.send("articles")
})

app.get('/pictures', (req, res) => {
    res.send("pictures")
})

app.use('/register', registerRouter)

app.get('/search', (req, res) => {
    // const search = req.query.q
    console.log("Searched for ", search)
    res.send("searchData")
})
app.post('/upload', (req, res) => {
    // const { postType } = req.body
    console.log("Uploaded media ")
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error("Failed to start server:", err);
    } else {
        console.log(`http://localhost:${process.env.PORT}`);
    }
});

app.use("", (req, res) => {
    res.status(404).send("Page not found")
})