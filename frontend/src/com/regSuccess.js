import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing Google Fonts for elegant typography
export default function RegSucc() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to login or another page after a delay.
    const timer = setTimeout(() => {
      navigate('/login'); // Redirect to login or any other page you want
    }, 5000); // 5-second delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundImage: "url('/img/trvl.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black overlay
      }}
    >
      <div
        className="container text-center"
        style={{
          fontFamily: "'Cinzel', serif", // Elegant font
          color: '#333',
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent white background
          borderRadius: '15px',
          padding: '40px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)', // Softer, larger shadow for depth
          border: '1px solid rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          margin: 'auto',
        }}
      >
        <h1
          className="display-4"
          style={{
            fontSize: '3rem', 
            fontWeight: '700',
            color: '#5D3FD3', // A royal purple for elegance
            marginBottom: '20px',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
            letterSpacing: '2px', // Spacing for elegance
          }}
        >
          Registration Successful
        </h1>
        <p
          className="lead"
          style={{
            fontSize: '1.5rem',
            fontFamily: "'Dancing Script', cursive", // Decorative script font for body
            color: '#444',
            marginBottom: '20px',
            letterSpacing: '1px',
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)', // Softer shadow for body text
          }}
        >
          You have registered successfully! Please wait while the admin reviews and approves
          your request.
        </p>
        <hr style={{ margin: '20px 0', borderTop: '2px solid #5D3FD3' }} />
        <p
          style={{
            fontSize: '1.2rem',
            fontFamily: "'Great Vibes', cursive", // Another elegant cursive for variation
            color: '#333',
            letterSpacing: '0.5px',
            marginBottom: '15px',
          }}
        >
          Thank you for your patience.
        </p>
        <p className="text-muted" style={{ fontSize: '1rem' }}>
          You will be redirected shortly...
        </p>
      </div>
    </div>
  );
}
