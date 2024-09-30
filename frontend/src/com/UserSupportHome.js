import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const UserSupportHome = () => {
    const navigate = useNavigate();
    const [hoverIndex, setHoverIndex] = useState(null); // State to track which box is hovered

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            navigate('/contactus'); // Redirect to Contact Us page when "Enter" is pressed
        }
    };

    return (
        <div
            style={{
                backgroundImage: 'url(/img/sl22.jpg)', // Update with your image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh', // Full viewport height
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white' // Default text color
            }}
        >
            <div className="container">
                <h2 className="text-center mb-4" style={{ fontWeight: 'normal', color: 'white' }}>How can we help you?</h2> {/* Text color set to white */}
                <div className="d-flex justify-content-center mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for help..."
                        onKeyDown={handleSearch} // Trigger search on 'Enter'
                        style={{
                            width: '70%', // Make the search bar longer
                            borderRadius: '50px', // Rounded corners
                            border: 'none', // Remove border
                            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly transparent white background
                            paddingLeft: '20px', // Add some padding
                            paddingRight: '20px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' // Add a subtle shadow to the input
                        }}
                    />
                </div>

                <div className="row justify-content-center">
                    {[
                        { name: 'Chatbox', path: '/chatbox', img: 'chatbox' },
                        { name: 'Contact Us', path: '/contactus', img: 'contact' },
                        { name: 'Add Feedback', path: '/feedbackForm', img: 'feedback1' },
                        { name: 'Add Review', path: '/review', img: 'review1' },
                        { name: 'FAQs', path: '/FAQ', img: 'faq1' }
                    ].map((item, index) => (
                        <div key={index} className="col-md-2 col-sm-6 mb-4 d-flex justify-content-center">
                            <div
                                className="p-3 border rounded shadow-sm"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    height: hoverIndex === index ? '280px' : '250px', // Increase height when hovered
                                    width: hoverIndex === index ? '220px' : '200px', // Increase width when hovered
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center', // Center content vertically
                                    cursor: 'pointer', // Cursor indicates clickable
                                    transition: 'all 0.3s ease-in-out' // Smooth transition
                                }}
                                onMouseEnter={() => setHoverIndex(index)} // Set the hovered box index
                                onMouseLeave={() => setHoverIndex(null)} // Reset the hovered index
                                onClick={() => handleNavigate(item.path)} // Navigation
                            >
                                <img
                                    src={`/img/${item.img}.jpg`}
                                    alt={item.name}
                                    className="img-fluid mb-2"
                                    style={{ maxHeight: '100px', objectFit: 'contain' }} // Image styling
                                />
                                <h5 style={{ color: 'black', textAlign: 'center' }}>{item.name}</h5> {/* Center align the text */}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5">
                    <h3 style={{ color: 'white' }}>Seamless Travel Planning with 24/7 Support</h3>
                    <p className="mt-3" style={{ maxWidth: '800px', margin: '0 auto', color: 'white' }}>
                        Experience stress-free travel management like never before with our round-the-clock customer support. 
                        At every step of your journey, our dedicated team is here to ensure your travel plans unfold smoothly, from booking to boarding and beyond.
                        Whether you’re facing last-minute changes, need quick answers, or just want a little extra guidance, our experts are just a click or call away. 
                        Trust in our 24/7 support to keep your travel experiences enjoyable and hassle-free, so you can focus on making the most of your adventures.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserSupportHome;
