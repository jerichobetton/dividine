import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./form.css";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    // add sign-up logic here
    console.log("Signing up:", username, email, password);
    // Add entered text from forms to mongoDB
    //
    try {
      const response = await axios.post("/api/v1/user", {
        userName: username,
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoComplete="username"
      />

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
        autoComplete="new-password"
      />

      <button type="submit" onClick={handleSignUp}>
        Sign Up
      </button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <p>
        Go back to <Link to="/">Home</Link>
      </p>
    </form>
  );
}

export default SignUpForm;
