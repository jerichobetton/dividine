import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dash from "./pages/Dash";
import NotFound from "./components/NotFound";
import Login from "./pages/Login";
import LoginForm from "./components/LoginForm";
import SignUp from "./pages/SignUp";
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
<<<<<<< HEAD
          <Route path="/home" element={<Home />} /> 
=======
>>>>>>> b84ed48ebd3748295d4732ad3b2dbef075a3d777
          <Route
            path="/"
            element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dash" element={<Dash />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;

