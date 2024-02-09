import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "/Users/colorcodedlabs/repos/dividine/dividine_project/src/images/male looking at phone.jpeg";
import "./form.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // add login logic here
    console.log("Logging in:", email, password);
  };

  return (
    <form className="form">
      <img src={loginImage} alt="Login" className="login-image" />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
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
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />

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
