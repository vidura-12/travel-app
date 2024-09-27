import React from 'react';
import './stl.css';
import { Link } from 'react-router-dom';

function Header2() {
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
                <li><Link to="/travelagent/dashGuide">Dashboard</Link></li> 
                 
              </ul>
            </div>
            <div className="auth-container">
              <a href="#">LogIn</a>
              <a href="#">SignUp</a>
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

export default Header2;
