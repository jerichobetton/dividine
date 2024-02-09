import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dash from './pages/Dash'; 
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Hero from './components/Hero'; 
import './app.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
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
