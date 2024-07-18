import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './location.css'; // Custom CSS file

const LocationTable = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/Location/')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  const handleApprove = (locationId) => {
    const locationToUpdate = locations.find(location => location._id === locationId);
    
    axios.put(`http://localhost:8081/Location/update/${locationId}`, {
      status: 'approved',
    })
      .then(response => {
        const updatedLocations = locations.map(location => {
          if (location._id === locationId) {
            return { ...location, status: 'approved' };
          }
          return location;
        });
        setLocations(updatedLocations);
      })
      .catch(error => {
        console.error('Error approving location:', error);
      });
  };

  const handleDelete = (locationId) => {
    axios.delete(`http://localhost:8081/Location/delete/${locationId}`)
      .then(response => {
        const updatedLocations = locations.filter(location => location._id !== locationId);
        setLocations(updatedLocations);
      })
      .catch(error => {
        console.error('Error deleting location:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="my-4 text-center">Location Details</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
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
                  <img src={`/img/${location.picture}`} alt={location.name} className="img-fluid table-img" />
                )}
              </td>
              <td className={`status-${location.status}`}>{location.status}</td>
              <td>
                {location.status !== 'approved' && (
                  <button className="btn btn-primary btn-sm mr-2" onClick={() => handleApprove(location._id)}>Approve</button>
                )}
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(location._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationTable;
