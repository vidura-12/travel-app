import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faUser);

function header() {
  return (
    <div>
      <section className="home">
        <div className="home-box">
          <nav className="navbar">
            <div className="logo bars">
              <div className="bar">
                <FontAwesomeIcon icon={faBars} />
              </div>
              <h3>Travel</h3>
            </div>
            <div className="menu">
              <div className="close">
                <FontAwesomeIcon icon={faTimes} />
              </div>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Travel Packages</a></li>
                <li><a href="#">Destinations</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div className="login-signup">
              <a href="#">LogIn</a>
              <a href="#">SignUp</a>
            </div>
          </nav>

          <div className="content">
            <h4>Travel</h4>
            <h1>Let's embark on your dream journey</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sapiente aperiam aliquam alias necessitatibus quos cupiditate assumenda adipisci odio modi.</p>
            <div className="search">
              <FontAwesomeIcon icon={faSearch} />
              <input type="text" placeholder="your journey begins with a search..." />
              <button>search</button>
            </div>
          </div>
        </div>
      </section>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    </div>
  );
}

export default header;
