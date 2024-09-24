import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './tour.css';
import { Form, FormGroup } from "reactstrap"; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Tours = () => {
  const navigate = useNavigate();  // Hook to navigate between routes
  const location = useLocation();  // Hook to access passed state
  const packageData = location.state?.package;  // Access the passed package data

  const handleCreatePackageClick = () => {
    navigate('/sellersignup');  // Navigate to the Sellersignup component
  };

  return (
    <div>
      <div className="tourpic">
        <h1>Our Tours</h1>

        <div className="searc">
          <div className="search_bar">
            <Form className="d-flex align-items-center gap-4 justify-content-center">
              <FormGroup className="d-flex gap-3 form_group">
                <span>
                  <i className="ri-map-pin-line"></i>
                </span>
                <div>
                  <h6>Location</h6>
                  <input type="text" placeholder="Where are you going?" />
                </div>
              </FormGroup>
              <FormGroup className="d-flex gap-3 form_group">
                <span>
                  <i className="ri-group-line"></i>
                </span>
                <div>
                  <h6>Max People</h6>
                  <input type="number" placeholder="Travelers" />
                </div>
              </FormGroup>
              <span className="search-icon">
                <i className="ri-search-line"></i>
              </span>
            </Form>
          </div>
        </div>
      </div>

      <p className="description">
        Welcome to TravelMate! Discover our diverse range of tours designed for every traveler's dream. 
        From adventure to relaxation, our meticulously planned tours offer unforgettable experiences in breathtaking destinations. 
        Join us and create lasting memories. Start your journey with TravelMate today!
      </p>

      <div className="enjoy-life-section">
        <div className="enjoy-life-text">
          Enjoy life with beautiful memories!
           <div className='enjoybtn'>
           <button className="agency" onClick={handleCreatePackageClick}>Customize Package</button>
           </div>
        </div>
        <p className='app'>Discover a Seamless Travel Experience with Our App:
        Our travel app allows you to explore, customize, and book travel packages tailored to your preferences. Whether you're seeking an adventurous getaway, a cultural journey, or a relaxing retreat, we empower you to customize your own travel package!</p>
      </div>

      <p className="destinations-title">
        Explore Stays in Trending Destinations
      </p>

      {/* Display the approved package details if available */}
      {packageData ? (
        <div className="card package-card">
          <img src={`/img/${packageData.image}`} alt={packageData.agencyName} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: 'bold', color: '#FF6347' }}>
              {packageData.location}
            </h5>
            <p className="card-text"><strong>Agency Name:</strong> {packageData.agencyName}</p>
            <p className="card-text"><strong>Phone Number:</strong> {packageData.phoneNumber}</p>
            <p className="card-text"><strong>Email:</strong> {packageData.email}</p>
            <p className="card-text"><strong>Places to Visit:</strong> {packageData.places.join(', ')}</p>
            <p className="card-text"><strong>Max People:</strong> {packageData.maxPeople}</p>
            <p className="card-text"><strong>Price:</strong> ${packageData.price}</p>
          </div>
        </div>
      ) : (
        <p>No package has been approved yet.</p>
      )}

      <div className="welcome">
        <h3>Welcome Travel Agencies!</h3>
        <p>
          Register on our website and review our partnership agreement. 
          Use our tools to design tailored travel packages, list them, and utilize our marketing resources. 
          Respond to inquiries, manage bookings, and use analytics to track performance and update packages.
        </p>
        <h5>Join us today!</h5>
        <center>
          <button className="agency" onClick={handleCreatePackageClick}>Travel Agency</button>
        </center>
        <div className="under">
          <p>For more info, contact us at <a href="mailto:support@yourtravelplatform.com">Support page</a></p>
        </div>
      </div>
    </div>
  );
};

export default Tours;
