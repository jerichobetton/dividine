import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/images/male_on_phone.jpeg";
import "./form.css";
import axios from "axios";

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // add login logic here
    try {
      const response = await axios.post("/api/login", { username, password });
      onLoginSuccess(response.data); // Pass token or user data
    } catch (error) {
      setError(error.message);
    }
    console.log("Logging in:", email, password);
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <img src={loginImage} alt="Login" className="login-image" />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        placeholder="Email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        placeholder="Password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" onClick={handleLogin}>
        Login
      </button>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <p>
        Go back to <Link to="/">Home</Link>
      </p>
    </form>
  );
}

export default LoginForm;
