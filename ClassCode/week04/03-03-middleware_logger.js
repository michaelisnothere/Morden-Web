const express = require("express");
const app = express();
const PORT = 8000;

// moving logger into its own function
const logger = (req, res) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toUTCString();
  console.log(`[${formattedDate}] ${req.method} ${req.originalUrl}`);
};
//same as before logger is made and code is put into it

// adding logger into the stream -> This should be broken 
app.get("/", logger, (req, res) => {
//this is whats known as middleware
//the loggger function is passed as a second argument to app.get()
//the purpose of this is to use logger as middleware to log request details before hello world is printed
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
