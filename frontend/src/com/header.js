import React from 'react';
import './style1.css';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  // Check if the token is stored in localStorage
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // For navigation after logout

  // Function to handle logout
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div>
      <section className="home-section">
        <div className="home-container">
          <nav className="navbar-custom">
            <div className="logo-container">
              <div className="menu-icon">
                <i className="fa fa-bars"></i>
              </div>
              <h3>TravelMate</h3>
            </div>
            <div className="menu-container">
              <ul className="menu-list">
                <li><a to="/home">Home</a></li>
                <li><a to="/UserSupportHome">Customer Support</a></li>
                <li><a to="/tours">Travel Packages</a></li>
                <li><a to="#">Vehicle Rental</a></li>
                <li><a to="/location">Gallery</a></li>
                <li><a to="/hotel">Hotels</a></li>
                <li><a to="/guide">Travel Agents</a></li>
                <li><a to="/eventView">Events</a></li>
              </ul>
            </div>
            <div className="auth-container">
              {token ? (
                <>
                  <a href="/profile">Profile</a>
                  <a onClick={handleLogout} style={{ background: 'red', color: 'white', textDecoration: 'none', cursor: 'pointer' }} >Logout</a>
                </>
              ) : (
                // If no token, show Login and SignUp buttons
                <>
                  <a href="/login">Login</a>
                  <a href='/signup'>Signup</a>
                </>
              )}
            </div>
          </nav>
        </div>
      </section>
      <script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
        integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" 
        crossOrigin="anonymous" 
        referrerPolicy="no-referrer">
      </script>
    </div>
  );
}

export default Header;
