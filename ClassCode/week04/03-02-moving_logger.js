const express = require("express");
const app = express();
const PORT = 8000;

// moving logger into its own function
const logger = (req, res) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toUTCString();
  console.log(`[${formattedDate}] ${req.method} ${req.originalUrl}`);
//same as before logs the data request method and url
//but this time it is in its own function called logger
};

app.get("/", (req, res) => {
//home page
  logger(req, res);
//calls the logger function
//req and res are passed as to logger and the logger function logs the data
//just like any function its reusable looks cleaner and has better scalability
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
