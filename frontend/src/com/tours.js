import React from 'react';
import { useNavigate } from 'react-router-dom';
import './tour.css';
import { Col, Form, FormGroup } from "reactstrap"; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Tours = () => {
    const navigate = useNavigate();  // Hook to navigate between routes

    const handleCreatePackageClick = () => {
        navigate('/agency');  // Navigate to the Agency component
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
                   
                    <p className="enjoy-life-text">
                        Enjoy life with beautiful memories!
                    </p>
                </div>

                <p className='destinations-title'>
                    Explore Stays in Trending Destinations
                </p>
              
                {/* Destination items here */}

                <div className="welcome">
                    <h3>Welcome Travel Agencies!</h3>
                    <p>
                        Register on our website and review our partnership agreement. 
                        Use our tools to design tailored travel packages, list them, and utilize our marketing resources. 
                        Respond to inquiries, manage bookings, and use analytics to track performance and update packages.
                    </p>
                    <h5>Join us today! </h5>
                    <center> 
                        <button className="agency" onClick={handleCreatePackageClick}>Create Package</button>
                    </center>
                    <div className="under">
                        <p>For more info, contact us at <a href="mailto:support@yourtravelplatform.com">Support page</a></p>
                    </div>
                </div>
            
        </div>
    );
}

export default Tours;
