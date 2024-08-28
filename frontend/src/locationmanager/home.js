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
    <div className='body1'>
    <div className="container mt-5">
      <h2 className="my-4 text-center">Location Details</h2>
      <table className="table table-striped table-bordered table-hover">
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
                    className="img-fluid table-img"
                    onClick={() => handleImageClick(`/img/${location.picture}`)}
                    style={{ cursor: 'pointer' }}
                  />
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
  
      <Modal show={modal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalImage} alt="Location" className="img-fluid" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  </div>
  
  );
};

export default LocationTable;
