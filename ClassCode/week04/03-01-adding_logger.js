const express = require("express");
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
//route is for home
  const currentDate = new Date();
//this creates a new data object which shows current time
  const formattedDate = currentDate.toUTCString();
//this formats the data obect to a string
  console.log(`[${formattedDate}] ${req.method} ${req.originalUrl}`);
  //req.method
//console logs the formmateddate
//req.method is the request method it gives a string like get or post depending on the rquest
//for example if you visit the home page the browser sends a get request in this case the req method will be get

  //req.originalUrl
//tells us the url that the client requested it gives up the full path of the url
//in this case the path is / so the req.originalUrl would be /
  res.send("hello world");
});

app.get("/about", (req, res) => {
  res.send("about");
  console.log(`${req.method} ${req.originalUrl}`);
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
