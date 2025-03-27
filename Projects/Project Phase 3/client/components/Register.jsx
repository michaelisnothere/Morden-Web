import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    const user = {
      username,
      password,
      email,
    };
    
    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Parse the JSON response
        } else {
          throw new Error("Failed to create user");
        }
      })
      .then((data) => {
        console.log(data.message);
      })
      .catch((err) => console.error("Error:", err));
  };
  

  const clearFields = () => {
    setUsername("");
    setPassword("");
    setEmail("");
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <nav>
        <ul>
          <li>
            <input placeholder="Search"></input>
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
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <h2>Enter in Info Below</h2>
        <div className="login">
          <p>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </p>
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
              <button
                onClick={() => {
                  if (username === "" || password === "" || email === "") {
                    alert("Please fill out all fields");
                  } else {
                    handleCreate();
                    console.log("User Created");
                    navigate("/");
                  }
                }}
              >
                Create
              </button>
            </li>
            <li>
              <button onClick={clearFields}>Clear</button>
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

export default Register;
