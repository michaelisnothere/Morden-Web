const express = require("express");
const app = express();
const PORT = 5000;
const { logger } = require("./middleware/logger");
const { hello } = require("./middleware/hello");
//imports both logger and hello functions from the middleware folder

// THE ORDER MATTERS
app.use(hello);
// adding hello into the stream
app.use(logger);
// adding logger into the stream

// adding logger into the stream -> This should be broken
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/about", (req, res) => {
  res.send("about");
});

app.get("/register", (req, res) => {
  res.send("register");
});

app.get("/login", (req, res) => {
  res.send("login");
});

app.get("/logout", (req, res) => {
  res.send("logout");
});

app.use((req, res) => {
  res.status(404).send("Page not Found");
});

app.listen(PORT, () => {
  console.log(`open to http://127.0.0.1:${PORT}`);
});
