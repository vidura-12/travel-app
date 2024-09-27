import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function Dash() {
  const navigate = useNavigate();

  const handleViewFeedback = () => {
    navigate('/usersupporter/feedbackRetrive');
  };

  return (
    <div className="position-relative vh-100 text-light" style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backdropFilter: 'blur(5px)',
    }}>
      <div className="d-flex justify-content-end align-items-center h-100 pe-5">
        <div className="bg-dark bg-opacity-50 p-5 rounded-3 shadow-lg" 
             style={{ width: '40%', marginRight: '30px', marginLeft: '20px', textAlign: 'center', position: 'relative', right: '100px' }}>
          <h2 className="fw-bold mb-3" style={{ fontSize: '1.7rem', color: '#F8F9FA' }}>
            Explore with our Expert Tour Guides
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
            Our dedicated team of experienced tour guides ensures that every trip is unforgettable. 
          </p>
        </div>
      </div>

      {/* Bottom-Right Corner Button */}
      <button
        onClick={handleViewFeedback}
        className="btn btn-primary btn-lg shadow position-absolute bottom-0 end-0 m-4"
        style={{ 
            borderRadius: '25px',
            padding: '10px 20px',
            transition: 'background-color 0.3s, transform 0.3s',
            fontSize: '1rem'
          }}
      >
        View All Feedbacks
      </button>
    </div>
  );
}