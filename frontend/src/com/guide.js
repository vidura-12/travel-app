import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Guide() {
  return (
    <div
      className="position-relative vh-100 text-light"
      style={{
        backgroundImage: "url('/img/dash.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(5px)',
      }}
    >
      <div className="d-flex justify-content-end align-items-center h-100 pe-5">
        <div
          className="bg-dark bg-opacity-50 p-5 rounded-3 shadow-lg" 
          style={{ 
            width: '40%', 
            marginRight: '30px', 
            marginLeft: '20px', 
            textAlign: 'center', 
            position: 'relative', 
            right: '100px' 
          }}
        >
          <h2
            className="fw-bold mb-3"
            style={{
              fontSize: '1.7rem', 
              color: '#F8F9FA', 
              fontFamily: "'Roboto', sans-serif", // Beautiful font
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)', // Subtle shadow
              letterSpacing: '0.5px', // Slightly increased letter spacing
            }}
          >
            Explore with our Expert Tour Guides
          </h2>
          <p
            className="small"
            style={{
              fontSize: '1.1rem', 
              lineHeight: '1.8', 
              color: '#EAEAEA', 
              fontFamily: "'Roboto', sans-serif", // Beautiful font
              letterSpacing: '0.5px', // Slightly increased letter spacing
              wordSpacing: '1.5px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)', // Subtle shadow
              textAlign: 'left',
            }}
          >
            Our dedicated team of experienced tour guides ensures that every trip is unforgettable. 
            From immersive local experiences to breathtaking adventures, let us guide you to explore 
            hidden gems around the world. Adventure, culture, or relaxation—your journey starts here!
          </p>
        </div>
      </div>

      {/* Bottom-Right Corner Button */}
      <a
        href="/allGuides"
        className="position-absolute bottom-0 end-0 m-4"
      >
        <button
          className="btn btn-lg shadow"
          style={{
            background: '#164B60',
            color: 'white',
            position: 'relative',
            right: '8%',
            bottom: '50px',
            borderRadius: '25px',
            padding: '10px 20px',
            transition: 'background-color 0.3s, transform 0.3s',
            fontSize: '1rem',
            border: 'none',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#164B60')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#1B6B93')}
        >
          View Booking Tourist
        </button>
      </a>

      <div>
        <a
          href="/GuideRegister"
          className="position-absolute bottom-0 end-0 m-4"
        >
          <button
            className="btn btn-primary btn-lg shadow"
            style={{
              position: 'relative',
              right: '250%',
              bottom: '50px',
              background: '#164B60',
              color: 'white',
              borderRadius: '25px',
              padding: '10px 20px',
              transition: 'background-color 0.3s, transform 0.3s',
              fontSize: '1rem',
              border: 'none',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#164B60')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#1B6B93')}
          >
            Register
          </button>
        </a>
      </div>
    </div>
  );
}
