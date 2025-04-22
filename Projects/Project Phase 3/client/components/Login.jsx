import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../shared/styles.css';
import {
  logout,
  handleLoginSuccess,
} from "../../server/authenticator/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    logout();
  });

  const clearFields = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        handleLoginSuccess(data);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-menu">
        <h2>Login or Register</h2>
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
              <button style={{marginTop: 30}} onClick={clearFields}>Clear</button>
            </li>
            <li>
              <button onClick={() => navigate("/register")}>Register</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
