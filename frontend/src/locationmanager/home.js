import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const LocationTable = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    
    axios.get('/api/locations') 
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []); 

  const handleApprove = (locationId) => {
   
    console.log(`Approving location with ID: ${locationId}`);
    
  };

  return (
    <div>
      <h2>Location Details</h2>
      <table className="location-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Description</th>
            <th>Picture</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location._id}>
              <td>{location.name}</td>
              <td>{location.city}</td>
              <td>{location.description}</td>
              <td>
                {location.picture && (
                  <img src={`/img/${location.picture}`} alt={location.name} style={{ maxWidth: '100px' }} />
                )}
              </td>
              <td>{location.status}</td>
              <td>
                <button onClick={() => handleApprove(location._id)}>Approve Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationTable;

