import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AllGuides() {
  const [tourGuides, setTourGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedTourGuides = async () => {
      try {
        const approvedGuides = JSON.parse(localStorage.getItem('approvedGuides')) || [];
        setTourGuides(approvedGuides);
      } catch (error) {
        console.error('Error fetching approved tour guides:', error);
      }
    };

    fetchApprovedTourGuides();
  }, []);

  const handleAddTourGuide = (guide) => {
    navigate('/bookGuide', {
      state: {
        selectedGuideId: guide._id,
        name: guide.name,
        address: guide.address,
        number: guide.number,
      },
    });
  };

  const filteredGuides = tourGuides.filter((guide) =>
    guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="d-flex flex-column min-vh-100 text-light"
      style={{
        backgroundImage: "url('/img/all2.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(5px)',
      }}
    >
      <div className="container my-auto py-5" style={{ paddingTop: '100px', position: 'relative', top: '70px' }}>
        <h2 className="text-center mb-4" style={{ fontSize: '2.5rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', color: '#fff' }}>
          Approved Tour Guides
        </h2>
        
        {/* Search Bar */}
        <div className="d-flex justify-content-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="form-control w-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              boxShadow: '2px 2px 6px rgba(0,0,0,0.5)',
              borderRadius: '25px',
              padding: '10px 20px',
              border: '1px solid #ccc',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#28a745'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
        </div>

        <style jsx>{`
          input::placeholder {
            color: rgba(255, 255, 255, 0.7); /* Light color for visibility */
            font-size: 1rem; /* Font size */
            font-style: italic; /* Italic style */
            /* Removed text-align to keep the placeholder left-aligned */
          }
        `}</style>

        <div className="row">
          {filteredGuides.length > 0 ? (
            filteredGuides.map(guide => (
              <div className="col-md-4 mb-4" key={guide._id}>
                <div className="card bg-dark text-white shadow" style={{ opacity: 0.85 }}>
                  <div className="card-body">
                    <h5 className="card-title">{guide.name}</h5>
                    <p className="card-text"><strong>Email:</strong> {guide.email}</p>
                    <p className="card-text"><strong>Address:</strong> {guide.address}</p>
                    <p className="card-text"><strong>Number:</strong> {guide.number}</p>
                    <p className="card-text"><strong>Experience:</strong> {guide.experience} years</p>
                    <p className="card-text"><strong>Language:</strong> {guide.language}</p>
                    <button
                      className="btn btn-success"
                      onClick={() => handleAddTourGuide(guide)}
                    >
                      Add Tour Guide
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-light">No guides found for the given search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
