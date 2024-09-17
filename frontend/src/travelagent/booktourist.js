import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './book.css';

export default function BookTourists() {
  const [tourGuides, setTourGuides] = useState([]);

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

  // Handle delete request
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour guide?')) {
      try {
        await axios.delete(`http://localhost:8081/TourGuide/delete/${id}`);
        // Update state to remove deleted guide
        setTourGuides(tourGuides.filter(guide => guide._id !== id));
        alert('Tour guide deleted successfully!');
      } catch (error) {
        console.error('Error deleting tour guide:', error);
        alert('Failed to delete the tour guide.');
      }
    }
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
            <th>Actions</th> {/* Add a header for actions */}
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
                  className="btn btn-danger"
                  onClick={() => handleDelete(guide._id)}
                >
                  Delete
                </button>
              </td> {/* Add a column for the delete button */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
