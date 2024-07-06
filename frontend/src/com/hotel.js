import React from 'react';
import './style.css';

function hotel() {
  return (
    <div>
      <section className="featured">
        <div className="gallery">
          <div className="box">
            <div className="first-box">
              <h4 className="label">Featured Offers</h4>
              <h2 className="heading">Unlock Exclusive Travel Deals</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, quae!</p>
              <a href="#">Show more</a>
              <div className="image">
                <img src={`${process.env.PUBLIC_URL}/img/plane.png`} alt="Plane" />
              </div>
            </div>
          </div>
          <div className="box">
            <img src={`${process.env.PUBLIC_URL}/img/featured/featured-1.jpg`} alt="Yuliaya Hotel" />
            <div className="content">
              <h2>Yuliaya Hotel</h2>
              <p>Gill Trawangan, Lombok</p>
              <div className="review-and-usd">
                <div className="review"><i className="fa fa-star"></i> 4.9 | 853 reviews</div>
                <p>USD 3,400</p>
              </div>
            </div>
          </div>
          <div className="box">
            <img src={`${process.env.PUBLIC_URL}/img/featured/featured-2.jpg`} alt="Feranndo Hotel" />
            <div className="content">
              <h2>Feranndo Hotel</h2>
              <p>Gill Trawangan, Lombok</p>
              <div className="review-and-usd">
                <div className="review"><i className="fa fa-star"></i> 4.9 | 853 reviews</div>
                <p>USD 3,400</p>
              </div>
            </div>
          </div>
          <div className="box">
            <img src={`${process.env.PUBLIC_URL}/img/featured/featured-3.jpg`} alt="Evin's Hotel" />
            <div className="content">
              <h2>Evin's Hotel</h2>
              <p>Gill Trawangan, Lombok</p>
              <div className="review-and-usd">
                <div className="review"><i className="fa fa-star"></i> 4.9 | 853 reviews</div>
                <p>USD 3,400</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
    </div>
  );
}

export default hotel;
