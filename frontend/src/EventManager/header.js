import React from 'react';
import './stl.css';
import { useLocation } from 'react-router-dom';


function Header2() {

    const path = useLocation.pathname;

    
    
  return (
    <div>
      <section className="home-section-2">
        <div className="home-container-2">
          <nav className="navbar-custom-2">
            <div className="logo-container-2">
              <div className="menu-icon-2">
                <i className="fa fa-bars"></i>
              </div>
              <h3>
                <span>Event </span>  
              </h3>
              <h4>Organizer</h4>
            </div>

            
            <div className="menu-container-2 lg:hidden">
              <div className="menu-close-2">
                <i className="fa fa-close"></i>
              </div>

              <ul className="menu-list-2">
                <li><a href="/EventManager/home">Home</a></li>
                <li><a href="EventManager/addEvent">Add Event</a></li>
                <li><a href="/EventManager/dashboard">Dashboard</a></li>
                <li><a href="/EventManager/eventCard">View Event</a></li>
              </ul>
            </div>
            <div className="auth-container-2">
              <a href="#" >LogOut</a>
            
            </div>
             
          </nav>
        </div>
      </section>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    </div>
  );
}

export default Header2;