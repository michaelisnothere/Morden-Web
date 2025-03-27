require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const recipesRouter = require('./router/recipes_router');

mongoose.connect(process.env.MONGO_DB);
const db = mongoose.connection;

db.once('open', () => {
    console.log("Db connected");
});

db.on('error', (err) => {
    console.log(err);
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', recipesRouter);

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
});