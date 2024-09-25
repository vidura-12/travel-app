import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AllGuides() {
  const [tourGuides, setTourGuides] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

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
    // Navigate to the BookGuide page with the selected guide's details
    navigate('/bookGuide', { state: { 
      selectedGuideId: guide._id,
      name: guide.name,
      address: guide.address,
      number: guide.number 
    }});
  };

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

        <div className="row">
          {tourGuides.map(guide => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
