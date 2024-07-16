import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <footer>
        <section className="footer">
          <div className="container">
            <div className="detail">
              <h3>Travel</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                in, non praesentium soluta quis enim aperiam aliquam, rem totam
                porro, vel obcaecati modi architecto error maiores iusto quaerat
                aut eum.
              </p>
              <h5>get in touch</h5>
              <a href="mailto:example@mail.com">example@mail.com</a>
              <div className="social">
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
            <div className="about-us">
              <h4>about us</h4>
              <ul>
                <li><a href="#">about us</a></li>
                <li><a href="#">our term</a></li>
                <li><a href="#">careers <span>we're hiring!</span></a></li>
                <li><a href="#">mission and values</a></li>
                <li><a href="#">partnerships</a></li>
              </ul>
            </div>
            <div className="help">
              <h4>help</h4>
              <ul>
                <li><Link to="/feed">FAQ</Link></li>
                <li><a href="#">booking guide</a></li>
                <li><a href="#">cancellation policy</a></li>
                <li><a href="#">site map</a></li>
              </ul>
            </div>
            <div className="resources">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">newsletter</a></li>
                <li><a href="#">blog</a></li>
                <li><a href="#">gallery</a></li>
                <li><a href="#">offers</a></li>
              </ul>
            </div>
          </div>

          <div className="copyright">
            <div>&copy;2024 - Travel, inc, all rights reserved</div>
            <div>
              <a href="#">term & conditions</a>
              <a href="#">privacy policy</a>
            </div>
          </div>
        </section>
      </footer>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      ></script>
    </div>
  );
}

export default Footer;
