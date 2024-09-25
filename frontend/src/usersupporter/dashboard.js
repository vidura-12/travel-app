import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function Dash() {
  const navigate = useNavigate();

  const handleViewFeedback = () => {
    navigate('/usersupporter/feedbackRetrive');
  };

  return (
    <div className="position-relative vh-100 text-light" 
         style={{
            backgroundImage: 'url("/img/sl50.jpg")', // Add your image path here
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backdropFilter: 'blur(5px)',
          }}>
      <div className="d-flex justify-content-end align-items-center h-100 pe-5">
        <div className="bg-dark bg-opacity-50 p-5 rounded-3 shadow-lg" 
             style={{ 
                 width: '40%', 
                 marginRight: '30px', 
                 marginLeft: '20px', 
                 textAlign: 'center', 
                 position: 'relative', 
                 right: '100px' 
             }}>
          <h2 className="fw-bold mb-3" style={{ fontSize: '1.7rem', color: '#F8F9FA' }}>
            Empowering User Experiences: Your Feedback, Our Commitment!
          </h2>
          <p className="small" style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.8', 
              color: '#EAEAEA', 
              fontFamily: "'Lora', serif", 
              letterSpacing: '0.5px',
              wordSpacing: '1.5px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
              textAlign: 'left'
          }}>
            Welcome to the User Supporter Admin Page, where your insights shape our journey towards excellence. Our mission is to provide unparalleled service and support, ensuring that every voice is heard and valued. Here, we gather and analyze feedback to identify opportunities for improvement, enabling us to enhance our offerings continually. Your feedback is not just a comment; it’s a powerful tool that drives our commitment to delivering exceptional experiences. Together, let’s build a community that thrives on collaboration, transparency, and responsiveness. Thank you for being an integral part of our mission!
          </p>
        </div>
      </div>

      {/* Bottom-Right Corner Button */}
      <button
        onClick={handleViewFeedback}
        className="btn btn-primary shadow position-absolute bottom-0 end-0 m-4"
        style={{ 
            borderRadius: '25px',
            padding: '15px 30px', // Increased padding for larger button
            transition: 'background-color 0.3s, transform 0.3s',
            fontSize: '1.2rem', // Increased font size for better readability
            width: '300px' // Increased width
          }}
      >
        View All Feedbacks
      </button>
    </div>
  );
}
