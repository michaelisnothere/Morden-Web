import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const clearFields = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <h1>Register / Login Page</h1>
      <nav>
        <ul>
          <li>
            <input type="text" placeholder="Search"></input>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/videos">Videos</Link>
          </li>
          <li>
            <Link to="/pictures">Pictures</Link>
          </li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          <li>
            <Link to="/upload">Upload Post</Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <h2>Login Page</h2>
        <div className="login">
          <p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            ></input>
          </p>
          <p>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </p>

          <ul>
            <li>
              <button onClick={() => {
                if(username === "" || password === ""){
                  alert("Please enter a username and password");
                }else{
                  console.log("Username: ", username, "Password: ", password);
                  navigate("/");
                }
              }}>Login</button>
              <button onClick={(clearFields)}>Clear</button>
            </li>
            <li>
              <button onClick={() => navigate("/register")}>Register</button>
            </li>
          </ul>
        </div>
      </div>
      <footer>
        <p>Place Holder for imporant links</p>
      </footer>
    </div>
  );
};

export default Login;
