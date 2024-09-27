import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa'; // Import icons

const ContactUs = () => {
    const [isHovered, setIsHovered] = useState(false); // State to track hover

    return (
        <div
            style={{
                backgroundImage: 'url(/img/sl56.jpeg)', // Replace with your image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div
                            className="bg-white rounded shadow p-4"
                            style={{
                                opacity: 0.9,
                                display: 'flex',
                                alignItems: 'center',
                                padding: '30px',
                                transform: isHovered ? 'scale(1.05)' : 'scale(1)', // Enlarge on hover
                                transition: 'transform 0.3s ease-in-out', // Smooth transition
                            }}
                            onMouseEnter={() => setIsHovered(true)} // Set hover state to true
                            onMouseLeave={() => setIsHovered(false)} // Reset hover state
                        >
                            <div className="w-50">
                                <h2 className="text-center mb-4">Contact Us</h2>
                                <div className="mb-3">
                                    <FaEnvelope />
                                    <strong> Email:</strong>
                                    <span style={{ textDecoration: 'underline' }}> travelmate@gmail.com</span>
                                </div>
                                <div className="mb-3">
                                    <FaPhone />
                                    <strong> Phone:</strong>
                                    <span> +94 110 45 256</span>
                                </div>
                                <div className="mb-3">
                                    <FaMapMarkerAlt />
                                    <strong> Address:</strong>
                                    <span> Travel Mate Pvt. Ltd., No. 15, Marine Drive, Colombo 03, Sri Lanka</span>
                                </div>
                                <div className="mb-3">
                                    <FaClock />
                                    <strong> Available Times:</strong>
                                    <span> 9:00 - 18:00</span>
                                </div>
                            </div>
                            <div className="w-50">
                                <img
                                    src="/img/photo.jpg" // Replace with your image path
                                    alt="Contact Us"
                                    className="img-fluid"
                                    style={{
                                        borderRadius: '10px',
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                        maxHeight: '300px', // Adjust as needed for larger image
                                    }} // Rounded corners for the image
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
