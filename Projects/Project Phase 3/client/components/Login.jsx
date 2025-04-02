import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIN, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const clearFields = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please enter a username and password");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/login/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        console.log(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setLoggedIn(true);
        navigate("/");
      } else {
        console.log(data.error);
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
              <button onClick={handleLogin}>Login</button>
              <button onClick={clearFields}>Clear</button>
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
