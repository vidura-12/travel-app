import React from 'react';
import './Header.css';  
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="navbar-custom">
      <div className="logo-container">
        <div className="menu-icon">
          <i className="fa fa-bars"></i>
        </div>
        <h3>TravelMate</h3>
      </div>
      <nav className="menu-container">
        <ul className="menu-list">
          <li><Link to="/home">Home</Link></li>

          <li><a href="#">About</a></li>

          <li><Link to="/tours">Travel Packages</Link></li>

          <li><a href="/vehicleRenatalHome">Vehicle Rental</a></li>

          <li><Link to="/location">Gallery</Link></li>

          <li><Link to="/hotel">Hotels</Link></li>

          <li><Link to="/travelagent/dashboard">Travel Agents</Link></li>

          <li><Link to="#">Events</Link></li>
        </ul>
      </nav>
      <div className="auth-container">
        <a href="/login">LogIn</a>
        <a href="/register">SignUp</a>
      </div>
    </header>
  );
}

export default Header;
