// src/components/Layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa'; // Using FaShoppingCart for the cart icon
import './Navbar.css'; // Custom CSS for navbar

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in by verifying the presence of a token
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Handle Log Out
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to Login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>SL Holidays<span className="dot">.</span></h1>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/collection">Places</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="navbar-icons">
        <FaSearch className="icon" onClick={() => navigate('/search')} />
        <FaUser className="icon" onClick={() => navigate('/profile')} />
        <div className="cart-icon" onClick={() => navigate('/cart')}>
          <FaShoppingCart className="icon" />
          <span className="cart-count">0</span>
        </div>
      </div>
      <div className="navbar-buttons">
        {isLoggedIn ? (
          <button className="logout-button" onClick={handleLogout}>Log Out</button>
        ) : (
          <>
            <button className="login-button" onClick={() => navigate('/login')}>Login</button>
            <button className="sign-up-button" onClick={() => navigate('/signup')}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
