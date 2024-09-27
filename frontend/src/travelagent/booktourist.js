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
        console.error('Error fetching tour guides', error);
      }
    };
    
    fetchTourGuides();
  }, []);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}