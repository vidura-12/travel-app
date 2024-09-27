import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './tour.css';
import { Form, FormGroup, Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // To make API requests

const Tours = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]); // State to store fetched package data
  const [filteredPackages, setFilteredPackages] = useState([]); // State for filtered packages
  const [location, setLocation] = useState(''); // State for location input
  const [maxPeople, setMaxPeople] = useState(''); // State for max people input

  // Fetch all packages when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8081/packageS/get')
      .then(response => {
        setPackages(response.data); // Set the fetched packages to the state
        setFilteredPackages(response.data); // Set the initial filtered packages to all packages
      })
      .catch(error => {
        console.error("There was an error fetching the packages!", error);
      });
  }, []);

  // Handle search logic
  const handleSearch = () => {
    const filtered = packages.filter(pkg => {
      const matchesLocation = location ? pkg.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesMaxPeople = maxPeople ? pkg.maxPeople >= parseInt(maxPeople) : true;
      return matchesLocation && matchesMaxPeople;
    });
    setFilteredPackages(filtered);
  };

  const handleCreatePackageClick = () => {
    navigate('/sellersignup');
  };

  return (
    <div>
      <div className="tourpic">
        <div className='ourtour'>
        <center>
        <h1 className='our'>Our Tours</h1>
        </center>
        <p className="description">
        Welcome to TravelMate! Explore our diverse tours, offering unforgettable experiences from adventure to relaxation. Create lasting memories and start your journey with us today!
        </p>
        </div>

       
        <div className="searc">
          <div className="search_bar">
            <Form className="d-flex align-items-center gap-4 justify-content-center">
              <FormGroup className="d-flex gap-3 form_group">
                <span><i className="ri-map-pin-line"></i></span>
                <div>
                  <h6>Location</h6>
                  <input 
                    type="text" 
                    placeholder="Where are you going?" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                  />
                </div>
              </FormGroup>
              <FormGroup className="d-flex gap-3 form_group">
                <span><i className="ri-group-line"></i></span>
                <div>
                  <h6>Max People</h6>
                  <input 
                    type="number" 
                    placeholder="Travelers" 
                    value={maxPeople} 
                    onChange={(e) => setMaxPeople(e.target.value)} 
                  />
                </div>
              </FormGroup>
              <Button className="search-icon" onClick={handleSearch}>
                <i className="ri-search-line"></i> 
              </Button>
            </Form>

          </div>
        
            

          
        </div>
      </div>

      <p className="destinations-title">
        Explore Stays in Trending Destinations
      </p>

      {/* Display filtered packages */}
      <div className="package-grid">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg) => (
            <div key={pkg._id} className="card package-card">
              <img src={`/img/${pkg.image}`} alt={pkg.agencyName} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', color: '#FF6347' }}>
                  {pkg.location}
                </h5>
                <p className="card-text"><strong>Agency Name:</strong> {pkg.agencyName}</p>
                <p className="card-text"><strong>Phone Number:</strong> {pkg.phoneNumber}</p>
                <p className="card-text"><strong>Email:</strong> {pkg.email}</p>
                <p className="card-text"><strong>Places to Visit:</strong> {pkg.places.join(', ')}</p>
                <p className="card-text"><strong>Max People:</strong> {pkg.maxPeople}</p>
                <p className="card-text"><strong>Price:</strong> ${pkg.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No packages available matching your criteria.</p>
        )}
      </div>

    

      <div className='enjoy2'>
      <div className="enjoy-life-section">
       
        <div className='app'>
          <center>
        <h3>Welcome Travel Agencies!</h3>
        <p>Register on our website and review our partnership agreement. 
          Use our tools to design tailored travel packages, list them, and utilize our marketing resources. 
          Respond to inquiries, manage bookings, and use analytics to track performance and update packages.<h5>Join us today!</h5></p></center>
          <div className='enjoybtn'>
           <button className="agency" onClick={handleCreatePackageClick}>Travel Agency</button>
           </div> 
        </div> 
       
      </div>
      </div>

      
    </div>
  );
};

export default Tours;
