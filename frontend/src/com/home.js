import React from 'react';
import './home.css';

function Home() {
  return (
    <div>
      <section className="home">
        <div className="home-container">      
          <video autoPlay muted loop className="background-video">
            <source src={`${process.env.PUBLIC_URL}/img/Sri Lanka.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="content">
            <h4>Discover Your Next Adventure</h4>
            <h1>Explore the world with <b>TravelMate</b>, where every journey begins with inspiration. Find your perfect destination, plan unforgettable experiences, and embark on a voyage of discovery. Start your adventure today!</h1>
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
              <p>all-in-one platform for effortless travel management. From booking flights and accommodations to crafting personalized itineraries, our site simplifies every step of your journey. With real-time updates, destination guides, and intuitive tools, we make travel planning smooth and stress-free. Explore the world with confidence, knowing that every detail of your trip is handled seamlessly.</p>
            </div>
          </div>
          <div className="box">
            <img src={`${process.env.PUBLIC_URL}/img/tool/map.png`} alt="Map" />
            <div className="content">
              <h4>experience</h4>
              <p>Our platform provides a tailored travel planning experience that adapts to your individual preferences and requirements. By leveraging advanced algorithms and user insights, Seamless Travel Planning ensures that your travel options—flights, accommodations, and activities—match your unique preferences, budget, and interests. Enjoy a personalized journey from start to finish, with recommendations and choices designed to fit seamlessly into your travel style..</p>
            </div>
          </div>
          <div className="box">
            <img src={`${process.env.PUBLIC_URL}/img/tool/trust.png`} alt="Trust" />
            <div className="content">
              <h4>Reliable and trustworthy</h4>
              <p> we prioritize your trust and confidence by providing a dependable travel management platform. Our robust system ensures accurate and up-to-date information, secure booking processes, and transparent communication. With a commitment to reliability, we safeguard your travel plans and personal data, offering peace of mind and a seamless experience every step of the way.</p>
            </div>
          </div>
        </div>
      </section>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
    </div>
  );
}

export default Home;
