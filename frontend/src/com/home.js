import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import Chatbot from './Chatbot';

function Home() {
  const [locations, setLocations] = useState([]);
  const [packages, setPackages] = useState([]); // State to store travel packages
  const [visibleDescription, setVisibleDescription] = useState({});
  localStorage.setItem('email', "viduranirmal@gmail.com");

  useEffect(() => {
    // Fetch locations from the API
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:8081/locationAdmin/');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    // Fetch travel packages from the API
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:8081/packageS/get');
        setPackages(response.data); // Store the fetched packages
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchLocations();
    fetchPackages(); // Fetch packages when the component loads
  }, []);

  // Filter to show only locations with status 'approved'
  const approvedLocations = locations.filter(location => location.status === "approved");
  
  // Filter to show only packages with status 'approved'
  const approvedPackages = packages.filter(pkg => pkg.status === "approved");

  return (
    <div>
      <section className="home">
        <div className="home-container1">
          <video autoPlay muted loop className="background-video">
            <source
              src={`${process.env.PUBLIC_URL}/img/videoplayback.webm`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          <div className="content1">
            <h4>Discover Your Next Adventure</h4>
            <h1>
              Explore the world with <b>TravelMate</b>, where every journey
              begins with inspiration. Find your perfect destination, plan
              unforgettable experiences, and embark on a voyage of discovery.
              Start your adventure today!
            </h1>
          </div>
        </div>
      </section>

      <section className="travel1">
        <div className="container1">
          <div className="box">
            <img
              src={`${process.env.PUBLIC_URL}/img/tool/planning.png`}
              alt="Planning"
            />
            <div className="content">
              <h4>Seamless travel planning</h4>
              <p>
                All-in-one platform for effortless travel management. From
                booking flights and accommodations to crafting personalized
                itineraries, our site simplifies every step of your journey.
              </p>
            </div>
          </div>
          <div className="box">
            <img src={`${process.env.PUBLIC_URL}/img/tool/map.png`} alt="Map" />
            <div className="content">
              <h4>Personalized experience</h4>
              <p>
                Our platform provides a tailored travel planning experience that
                adapts to your individual preferences and requirements.
              </p>
            </div>
          </div>
          <div className="box">
            <img
              src={`${process.env.PUBLIC_URL}/img/tool/trust.png`}
              alt="Trust"
            />
            <div className="content">
              <h4>Reliable and trustworthy</h4>
              <p>
                We prioritize your trust and confidence by providing a
                dependable travel management platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-gallery">
        <div className="container">
          <h2>Featured Locations</h2>
          <div className="location-grid">
            {approvedLocations.map((location) => (
              <div className="location-card" key={location._id}>
                <img
                  src={`/img/${location.picture}`}
                  alt={location.name}
                  className="location-card-img"
                />
                <h3>{location.name}</h3>
                {visibleDescription[location._id] && (
                  <p className="location-description">{location.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Packages Section */}
      <section className="package-gallery">
        <div className="container">
          <h2>Available Travel Packages</h2>
          <div className="package-grid">
            {approvedPackages.map((pkg) => (
              <div className="package-card" key={pkg._id}>
                <img
                  src={`/img/${pkg.image}`}
                  alt={pkg.agencyName}
                  className="package-card-img"
                />
                <h3>{pkg.agencyName}</h3>
                <p><strong>Location:</strong> {pkg.location}</p>
                <p><strong>Places:</strong> {pkg.places.join(', ')}</p>
                <p><strong>Max People:</strong> {pkg.maxPeople}</p>
                <p><strong>Price:</strong> ${pkg.price}</p>
                <p><strong>Contact:</strong> {pkg.phoneNumber}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Chatbot />
    </div>
  );
}

export default Home;
