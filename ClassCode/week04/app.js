const express = require("express");
//express is imported using this 
const app = express();
//a instance of the express app is created in the app variable
const PORT = 8000;
//create the listening port

app.get("/", (req, res) => {  
  res.send("hello world");
});
//the server handles differeant gttp get requests using app.get()
//this one uses the / or home route and the server repondes with hello world

app.get("/about", (req, res) => {
  res.send("about");
});
//this route visits the /about route and the server respondes with about

app.get("/register", (req, res) => {
  res.send("register");
});
//like before this route goes to resister

app.get("/login", (req, res) => {
  res.send("login");
});
//like before this route goes to login

app.get("/logout", (req, res) => {
  res.send("logout");
});
//like before this route goes to logout

app.use((req, res) => {
  res.status(404).send("Page not Found");
});
//this is the default route if the servers goes to a unknown route it replys with page not found

app.listen(PORT, () => {
  console.log(`open to http://127.0.0.1:${PORT}`);
});
//used to start the server specified at port 8000
