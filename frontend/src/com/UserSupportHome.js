import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const UserSupportHome = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
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
                <h2 className="text-center mb-4">How can we help you?</h2>
                <div className="d-flex justify-content-center mb-4">
                    <input
                        type="text"
                        className="form-control w-50 rounded-pill" // Rounded corners
                        placeholder="Search for help..."
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
                                    backgroundColor: 'white',
                                    height: '250px',
                                    width: '200px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer' // Cursor indicates clickable
                                }}
                                onClick={() => handleNavigate(item.path)} // Navigation
                            >
                                <img
                                    src={`/img/${item.img}.jpg`}
                                    alt={item.name}
                                    className="img-fluid mb-2"
                                    style={{ maxHeight: '100px', objectFit: 'contain' }} // Image styling
                                />
                                <h5 style={{ color: 'black' }}>{item.name}</h5>
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
