import React from 'react';
import './stl.css';
import { Button, TextInput } from 'flowbite-react';
import {AiOutlineSearch} from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
                <span>Travel </span>  
              </h3>
              <h4>Guide</h4>
            </div>

            <div className="text-input-wrapper">
      <input type="text" placeholder="Search" className="text-input" />
      <AiOutlineSearch className="input-icon" />
    </div>
            <div className="menu-container-2 lg:hidden">
              <div className="menu-close-2">
                <i className="fa fa-close"></i>
              </div>

              <ul className="menu-list-2">
                <li><a href="/travelagent/home">Home</a></li>
                <li><a href="/travelagent/about">About</a></li>
                <li><a href="/travelagent/dashboard">Dashboard</a></li>
                <li><a href="/travelagent/contact">Contact</a></li>
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
