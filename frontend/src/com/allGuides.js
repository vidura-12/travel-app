import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AllGuides() {
  const [tourGuides, setTourGuides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const response = await axios.get('http://localhost:8081/TourGuide/all');
        setTourGuides(response.data);
      } catch (error) {
        console.error('Error fetching tour guides:', error);
      }
    };
    
    fetchTourGuides();
  }, []);

  const handleAddTourGuide = (guide) => {
    navigate('/bookGuide', { 
      state: { 
        selectedGuideId: guide._id, 
        name: guide.name, 
        address: guide.address, 
        number: guide.number 
      } 
    }); // Pass guide details
  };

  return (
    <div className="dashboard-container">
      <h2>Tour Guide Dashboard</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Number</th>
            <th>Experience</th>
            <th>Language</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tourGuides.map(guide => (
            <tr key={guide._id}>
              <td>{guide.name}</td>
              <td>{guide.email}</td>
              <td>{guide.address}</td>
              <td>{guide.number}</td>
              <td>{guide.experience}</td>
              <td>{guide.language}</td>
              <td>
                <button
                  style={{
                    backgroundColor: 'green', 
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleAddTourGuide(guide)}
                >
                  Add Tour Guide
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
