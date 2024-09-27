import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function Dash() {
  const navigate = useNavigate();

  return (
    <div className="position-relative vh-100 text-light" 
         style={{
            backgroundImage: 'url("/img/sl50.jpg")', // Add your image path here
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backdropFilter: 'blur(5px)',
          }}>
      
      {/* Centered 3 Boxes in Horizontal Layout */}
      <div className="d-flex justify-content-center align-items-center h-100">
        {/* Box 1 */}
        <div className="p-5 rounded-3 shadow-lg mx-3 hover-box" 
             style={{ 
               flex: '1', // Allow equal growth
               minWidth: '250px', // Set a minimum width for each box
               height: '450px', // Fixed height for consistency
               textAlign: 'center', 
               backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker background
               transition: 'transform 0.3s ease', // Smooth transition
             }}>
          <h2 className="fw-bold mb-3" style={{ fontSize: '1.7rem', color: '#F8F9FA' }}>
            Driving Positive Change: Your Voice, Our Mission!
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
            Welcome to the User Supporter Admin Dashboard, where every piece of feedback drives us towards meaningful change. Your role in collecting and analyzing feedback is crucial for shaping a platform that prioritizes user satisfaction and continuous improvement. We are committed to ensuring that every suggestion and concern is carefully evaluated, helping us enhance our services and provide the best possible experience. Let’s work together to build a responsive, user-centric environment that reflects the needs and aspirations of our community. Thank you for your dedication to making a difference!
          </p>
        </div>

        {/* Box 2 */}
        <div className="p-5 rounded-3 shadow-lg mx-3 hover-box" 
             style={{ 
               flex: '1', // Allow equal growth
               minWidth: '250px', // Set a minimum width for each box
               height: '450px', // Fixed height for consistency
               textAlign: 'center', 
               backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker background
               transition: 'transform 0.3s ease', // Smooth transition
             }}>
          <h2 className="fw-bold mb-3" style={{ fontSize: '1.7rem', color: '#F8F9FA' }}>
            Building a Stronger Community: One Feedback at a Time!
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
            Thank you for being a part of the User Supporter Admin team! Every comment and suggestion you gather strengthens our platform and brings us closer to our goal of excellence. Your feedback efforts help us identify areas where we can improve and grow, ensuring that our users feel heard and valued. Together, we can create a culture of trust, support, and collaboration, where user feedback is the foundation for better experiences. Let’s continue this journey of mutual respect and continuous improvement. We’re grateful for your essential contributions!
          </p>
        </div>

        {/* Box 3 */}
        <div className="p-5 rounded-3 shadow-lg mx-3 hover-box" 
             style={{ 
               flex: '1', // Allow equal growth
               minWidth: '250px', // Set a minimum width for each box
               height: '450px', // Fixed height for consistency
               textAlign: 'center', 
               backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker background
               transition: 'transform 0.3s ease', // Smooth transition
             }}>
          <h2 className="fw-bold mb-3" style={{ fontSize: '1.7rem', color: '#F8F9FA' }}>
            Enhancing User Support: Your Efforts Make a Difference!
          </h2>
          <p className="small" style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.8', 
              color: '#EAEAEA', 
              fontFamily: "'Lora', serif", 
              letterSpacing: '0.5px',
              wordSpacing: '1.5px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              textAlign: 'left'
          }}>
            As a valued member of the User Supporter Admin team, your efforts in collecting and responding to feedback are key to creating a seamless user experience. We rely on your insights to fine-tune our platform and deliver services that truly resonate with our users. Each piece of feedback you handle represents an opportunity to learn, improve, and better serve our community. Together, we’re building a platform that adapts to user needs and evolves with their expectations. Thank you for your hard work and commitment to improving user support!
          </p>
        </div>
      </div>

      {/* Add hover effect using CSS */}
      <style>
        {`
          .hover-box:hover {
            transform: scale(1.05); /* Slightly increase the size on hover */
            z-index: 1; /* Bring the hovered box in front */
          }
        `}
      </style>
    </div>
  );
}
