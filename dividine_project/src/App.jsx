import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dash from "./pages/Dash";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginForm from "./components/LoginForm";
import SignUp from "./pages/SignUp";
import Hero from "./components/Hero";
import "./app.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    // Store token or user data in localStorage or state
  };

  // Redirect to Home page if logged in
  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/home" element={<Home />} /> 
          <Route
            path="/"
            element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dash" element={<Dash />} />
        </Routes>
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;

