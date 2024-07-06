import React from 'react';
import './style.css';

function Location() {
  return (
    <div>
      <section className="home">
        <div className="home-box">      
          <div className="content">
            <h4>Travel</h4>
            <h1>Let's start your dream journey with .......</h1>
            <div className="search">
              <i className="fa fa-search"></i>
              <input type="text" placeholder="Your journey begins with a search..." />
              <button>Search</button>
            </div>
          </div>
        </div>
      </section>

      <section className="destination">
        <h4 className="label">Destinations</h4>
        <div className="container">
          <div className="container-box">
            <h2 className="heading">City escape and nature retreats</h2>
            <div className="content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam exercitationem necessitatibus architecto, obcaecati aut quo odio excepturi nesciunt quam quis deserunt eveniet nemo non nihil nostrum. Repellendus vel rem eaque.</p>
              <a href="#">Explore more <i className="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
          <div className="gallery">
            <div className="box">
              <img src={`${process.env.PUBLIC_URL}/img/destinations/destinations-5.jpg`} alt="East Nusa Tenggara" />
              <div className="text">
                <h2>East Nusa Tenggara</h2>
              </div>
            </div>
            <div className="box">
              <img src={`${process.env.PUBLIC_URL}/img/destinations/destinations-1.jpg`} alt="Bali" />
              <div className="text">
                <h2>Bali</h2>
              </div>
            </div>
            <div className="box">
              <img src={`${process.env.PUBLIC_URL}/img/destinations/destinations-2.jpg`} alt="Bali" />
              <div className="text">
                <h2>Bali</h2>
              </div>
            </div>
            <div className="box">
              <img src={`${process.env.PUBLIC_URL}/img/destinations/destinations-3.jpg`} alt="East Java" />
              <div className="text">
                <h2>East Java</h2>
              </div>
            </div>
            <div className="box">
              <img src={`${process.env.PUBLIC_URL}/img/destinations/destinations-4.jpg`} alt="West Papua" />
              <div className="text">
                <h2>West Papua</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
    </div>
  );
}

export default Location;
