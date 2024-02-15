import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/images/male_on_phone.jpeg";
import "./form.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // add login logic here
    try {
      const response = await axios.post("api/v1/user/login", {
        email,
        password,
      });
      console.log(response.data);
      console.log(
        "YO! You are who you are and who you said you are so come on in"
      );
    } catch (error) {
      console.log(error.response.data.message);
      console.log("All you do is lie! Lyin");
    }
    console.log("Logging in:", email, password);
    navigateTo("/dash"); // Redirect to the dashboard after login
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
        Go back to <Link to="/home">Dividine</Link> {/* Add Link component for Home button */}
      </p>
    </form>
  );
}

export default LoginForm;
