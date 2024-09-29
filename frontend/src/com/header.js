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
                <li><Link to="/home">Home</Link></li>
                <li><a href="/UserSupportHome">Customer Support</a></li>
                <li><Link to="/tours">Travel Packages</Link></li>
                <li><a href="#">Vehicle Rental</a></li>
                <li><Link to="/location">Gallery</Link></li>
                <li><Link to="/hotel">Hotels</Link></li>
                <li><Link to="/guide">Travel Agents</Link></li>
                <li><Link to="/eventView">Events</Link></li>
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
                  <a href='/signin'>Signin</a>
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
