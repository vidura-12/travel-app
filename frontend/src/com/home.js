import React from 'react';
import './home.css';

function Home() {
  return (
    <div>
      <section className="home">
        <div className="home-container">      

          <div className="content">
            <h4>Discover Your Next Adventure</h4>
            <h1>Explore the world with [Your Travel Website Name], where every journey begins with inspiration. Find your perfect destination, plan unforgettable experiences, and embark on a voyage of discovery. Start your adventure today!</h1>
            <p></p>
           
          </div>
        </div>
      </section>
      <section className="travel">
        <div className="container">
          <div className="box">
            <img src={`${process.env.PUBLIC_URL}/img/tool/planning.png`} alt="Planning" />
            <div className="content">
              <h4>Seamless travel planning</h4>
              <p>The company itself is a very successful company. With that pain which will be pursued by those blessed with pleasures, but more accusers than anyone.</p>
            </div>
          </div>
          <div className="box">
            <img src={`${process.env.PUBLIC_URL}/img/tool/map.png`} alt="Map" />
            <div className="content">
            <h4>Tailored experiences</h4>
               <p>The pain itself should be followed by the adipiscing developer. That pain which will be followed by those blessed with pleasures, but more accusers than anyone.</p>
            </div>
          </div>
          <div className="box">
            <img src={`${process.env.PUBLIC_URL}/img/tool/trust.png`} alt="Trust" />
            <div className="content">
            <h4>Reliable and trustworthy</h4>
          <p>The pain itself should be followed by the adipiscing developer. That pain which will be followed by those blessed with pleasures, but more accusers than anyone.</p>
            </div>
          </div>
        </div>
      </section>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
    </div>
  );
}

export default Home;
