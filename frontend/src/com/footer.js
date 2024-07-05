import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faUser);

function footer() {
  return (
    <div>
      <footer>
          <section class="footer">
               <div class="container">
                    <div class="detail">
                         <h3>Travel</h3>
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere in, non praesentium soluta quis enim aperiam aliquam, rem totam porro, vel obcaecati modi architecto error maiores iusto quaerat aut eum.</p>
                         <h5>get in touch</h5>
                         <a href="#">example@mail.com</a>
                         <div class="social">
                              <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                              <a href="#"><i class="fa-brands fa-facebook"></i></a>
                              <a href="#"><i class="fa-brands fa-twitter"></i></a>
                         </div>
                    </div>
                    <div class="about-us">
                         <h4>about us</h4>
                         <li><a href="#">about us</a></li>
                         <li><a href="#">our term</a></li>
                         <li><a href="#">careers <span>we're hiring!</span></a></li>
                         <li><a href="#">mission and values</a></li>
                         <li><a href="#">partnerships</a></li>
                    </div>
                    <div class="about-us">
                         <h4>help</h4>
                         <li><a href="#">FAQ</a></li>
                         <li><a href="#">booking guide</a></li>
                         <li><a href="#">cancellation policy</a></li>
                         <li><a href="#">site map</a></li>
                    </div>
                    <div class="about-us">
                         <h4>Resources</h4>
                         <li><a href="#">newsletter</a></li>
                         <li><a href="#">blog</a></li>
                         <li><a href="#">gallery</a></li>
                         <li><a href="#">offers</a></li>
                    </div>
               </div>
  
               <div class="copyright">
                    <div>&copy;2024 - Travel, inc, all rights reserved</div>
                    <div>
                         <a href="#">term & conditions</a>
                         <a href="#">privacy policy</a>
                    </div>
               </div>
          </section>
      </footer>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    </div>
  );
}

export default footer;
