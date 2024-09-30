import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import './Viewl.css';
import Swal from 'sweetalert2'; // Import SweetAlert

const token = localStorage.getItem('token');

const UserLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [modal, setModal] = useState(false);
  const [newImage, setNewImage] = useState(null); // State for new image file

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      fetchLocations(email);
    } else {
      setError('No user email found in local storage');
    }
  }, []);

  const fetchLocations = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8081/Location/user-locations?email=${email}`);
      setLocations(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEditClick = (location) => {
    setEditingLocation(location);
    setEditModalOpen(true);
  };

  const handleUpdateLocation = (e) => {
    const { name, value } = e.target;
  
    if (name === 'city' && !validateCityName(value)) {
      return; // Prevent updating state if the value is invalid
    }
  
    setEditingLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };
  

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]); // Set the new image file
  };

  const handleSaveChanges = async () => {
    if (!validateCityName(editingLocation.city)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid input',
        text: 'City name cannot contain numbers.',
      });
      return;
    }

    try {
      let updatedLocation = { ...editingLocation };

      // Directly use the new image URL instead of uploading
      if (newImage) {
        updatedLocation.picture = URL.createObjectURL(newImage); // Create a URL for the new image file
      }

      // Send updated location data excluding name
      await axios.put(`http://localhost:8081/Location/${editingLocation._id}`, updatedLocation);
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location._id === editingLocation._id ? updatedLocation : location
        )
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const validateCityName = (city) => {
    return /^[a-zA-Z\s]*$/.test(city);
  };
  

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleImageClick = (image) => {
    setModalImage(image);
    toggleModal();
  };

  // New function to handle location deletion
  const handleDeleteLocation = async (locationId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8081/locationAdmin/delete/${locationId}`, {
          headers: {
            authorization: token // Include the token in the request header
          }
        });
        setLocations((prevLocations) => prevLocations.filter(location => location._id !== locationId));
        Swal.fire('Deleted!', 'Your location has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting location:', error);
        Swal.fire('Error!', 'There was an error deleting the location.', 'error');
      }
    }
  };

  if (loading) {
    return <p>Loading locations...</p>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="viewLocationContainer">
      <Sidebar />

      <div className="viewLocationLocationContainer">
        <h2>User Added Locations</h2>

        <input
          type="text"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="viewLocationSearchInput"
        />

        {locations.length === 0 ? (
          <p>No locations found for this user.</p>
        ) : (
          <ul className="viewLocationLocationList">
            {locations
              .filter(location => location.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((location) => (
                <li key={location._id} className="viewLocationLocationItem">
                  <div className="viewLocationLocationContent">
                    <img
                      src={`/img/${location.picture}`}
                      alt={location.name}
                      className="locationImage"
                      onClick={() => handleImageClick(`/img/${location.picture}`)}
                    />
                    <div>
                      <strong>{location.name}</strong> - {location.city}
                      <p>{location.description}</p>
                      {/* Status Display */}
                      <span
                className={`location-status ${location.status === 'approved' ? 'approved' : 'not-approved'}`}
              >
                  {location.status === 'approved' ? 'Approved' : 'Not Approved'}
            </span>

                    </div>
                    <button
                      className="viewLocationEditBtn"
                      onClick={() => handleEditClick(location)}
                    >
                      Edit
                    </button>
                    <button
                      className="viewLocationDeleteBtn" // Add CSS class for delete button
                      onClick={() => handleDeleteLocation(location._id)} // Handle delete
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>

      {editModalOpen && (
        <div className="viewLocationModal">
          <div className="viewLocationModalContent">
            <h3>Edit Location</h3>
            <div className="viewLocationInputGroup">
              <label htmlFor="name">Location Name</label>
              <input
                type="text"
                name="name"
                value={editingLocation.name}
                onChange={handleUpdateLocation}
                className="viewLocationModalInput"
                disabled // Disable editing the name
              />
            </div>
            <div className="viewLocationInputGroup">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                value={editingLocation.city}
                onChange={handleUpdateLocation}
                className="viewLocationModalInput"
              />
            </div>
            <div className="viewLocationInputGroup">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                value={editingLocation.description}
                onChange={handleUpdateLocation}
                className="viewLocationModalInput"
                rows="4"
              />
            </div>

            <div className="viewLocationInputGroup">
              <label htmlFor="newImage">Upload New Image</label>
              <input
                type="file"
                name="newImage"
                accept="image/*"
                onChange={handleImageChange}
                className="viewLocationModalInput"
              />
            </div>
            <div className="viewLocationButtonContainer">
              <button onClick={handleSaveChanges} className="viewLocationSaveBtn">
                Save Changes
              </button>
              <button onClick={() => setEditModalOpen(false)} className="viewLocationCancelBtn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="location-modal-overlay" onClick={toggleModal}>
          <div className="location-modal-content">
            <img src={modalImage} alt="Location" className="location-modal-img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLocations;
