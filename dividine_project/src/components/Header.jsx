import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header className="header">
      <div className="app-content header-content">
        <h1>DiviDine</h1>
        
        <div className="header-buttons">
          <Link to="/login" className="log-in-button">Log In</Link>
          <Link to="/signup" className="sign-up-button">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;    