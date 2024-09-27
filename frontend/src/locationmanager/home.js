import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './location.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For navigation

const LocationTable = () => {
  const [locations, setLocations] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  useEffect(() => {
    const fetchLocations = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in first.');
        navigate('/admin/login'); // Redirect to login page
        return;
      }

      try {
        const response = await axios.get('http://localhost:8081/locationAdmin/', {
          headers: {
            authorization: token
          }
        });
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token'); // Clear token
          navigate('/admin/login'); // Redirect to login page
        }
      }
    };

    fetchLocations();
  }, [navigate]);

  const handleApprove = async (locationId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      navigate('/admin/login'); // Redirect to login page
      return;
    }

    try {
      await axios.put(`http://localhost:8081/locationAdmin/update/${locationId}`, {
        status: 'approved',
      }, {
        headers: {
          authorization: token
        }
      });
      const updatedLocations = locations.map(location => {
        if (location._id === locationId) {
          return { ...location, status: 'approved' };
        }
        return location;
      });
      setLocations(updatedLocations);
    } catch (error) {
      console.error('Error approving location:', error);
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token'); // Clear token
        navigate('/admin/login'); // Redirect to login page
      }
    }
  };

  const handleDelete = async (locationId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      navigate('/admin/login'); // Redirect to login page
      return;
    }

    try {
      await axios.delete(`http://localhost:8081/locationAdmin/delete/${locationId}`, {
        headers: {
          authorization: token // Include the token in the request header
        }
      });
      const updatedLocations = locations.filter(location => location._id !== locationId);
      setLocations(updatedLocations);
    } catch (error) {
      console.error('Error deleting location:', error);
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token'); // Clear token
        navigate('/admin/login'); // Redirect to login page
      }
    }
  };

  const toggleModal = () => setModal(!modal);

  const handleImageClick = (image) => {
    setModalImage(image);
    toggleModal();
  };

  return (
    <div className="location-dashboard-body">
      <div className="location-dashboard-container">
        <h2 className="location-dashboard-title">Location Details</h2>
        <table className="location-dashboard-table">
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
                    <img
                      src={`/img/${location.picture}`}
                      alt={location.name}
                      className="location-table-img"
                      onClick={() => handleImageClick(`/img/${location.picture}`)}
                    />
                  )}
                </td>
                <td className={`location-status-${location.status}`}>{location.status}</td>
                <td className="location-action-buttons">
                  {location.status !== 'approved' && (
                    <button className="location-btn-approve" onClick={() => handleApprove(location._id)}>Approve</button>
                  )}
                  <button className="location-btn-delete" onClick={() => handleDelete(location._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modal && (
          <div className="location-modal-overlay" onClick={toggleModal}>
            <div className="location-modal-content">
              <img src={modalImage} alt="Location" className="location-modal-img" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationTable;
