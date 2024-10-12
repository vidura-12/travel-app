import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './approvedPackages.css';

const SellerPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [formData, setFormData] = useState({
    agencyName: '',
    phoneNumber: '',
    location: '',
    places: '',
    maxPeople: '',
    price: ''
  });

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      axios.get(`http://localhost:8081/packages/sellerlog/${email}`)
        .then((response) => {
          setPackages(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err); // Log the error for debugging
          setError('Failed to fetch packages');
          setLoading(false);
        });
    } else {
      setError('No email found in localStorage');
      setLoading(false);
    }
  }, []);

  const handleEditClick = (pkg) => {
    
    setCurrentPackage(pkg);
    setFormData({
      agencyName: pkg.agencyName,
      phoneNumber: pkg.phoneNumber,
      location: pkg.location,
      places: pkg.places.join(', '), // Join places for input
      maxPeople: pkg.maxPeople,
      price: pkg.price
    });
   
    setIsPopupOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const updatedData = {
            ...formData,
            email: localStorage.getItem('email'), // Ensure email is included
            places: formData.places.split(',').map(place => place.trim()) // Convert back to an array and trim whitespace
        };

        const formDataObj = new FormData();
        Object.keys(updatedData).forEach(key => {
            formDataObj.append(key, updatedData[key]);
        });

        if (formData.image) {
            formDataObj.append('image', formData.image);
        }

        const response = await axios.put(`http://localhost:8081/packages/${currentPackage._id}`, formDataObj, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        // Handle successful response
        const updatedPackages = packages.map((pkg) => (pkg._id === response.data._id ? response.data : pkg));
        setPackages(updatedPackages);
        setIsPopupOpen(false);
        setCurrentPackage(null);
    } catch (error) {
        console.error(error); // Log the error for debugging
        setError('Failed to update package');
    }
};



  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentPackage(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="body65">
      <div className="seller-packages77">
        <h2 className='h2'>Approved Packages</h2>
        {packages.length === 0 ? (
          <p className="no-packages">No approved packages available.</p>
        ) : (
          <table className="packages-table">
            <thead>
              <tr>
                <th>Agency Name</th>
                <th>Phone Number</th>
                <th>Location</th>
                <th>Places</th>
                <th>Max People</th>
                <th>Price</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg._id}>
                  <td>{pkg.agencyName}</td>
                  <td>{pkg.phoneNumber}</td>
                  <td>{pkg.location}</td>
                  <td>{pkg.places.join(', ')}</td>
                  <td>{pkg.maxPeople}</td>
                  <td>${pkg.price}</td>
                  <td>
                    <img src={`/img/${pkg.image}`} alt={pkg.agencyName} className="package-image" />
                  </td>
                  <td>
                    <button  className="location-btn-approve"onClick={() => handleEditClick(pkg)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h2>Edit Package</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleChange}
                placeholder="Agency Name"
                required
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                required
              />
              <input
                type="text"
                name="places"
                value={formData.places}
                onChange={handleChange}
                placeholder="Places (comma-separated)"
                required
              />
              <input
                type="number"
                name="maxPeople"
                value={formData.maxPeople}
                onChange={handleChange}
                placeholder="Max People"
                required
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
              />
              <button className="location-btn-approve" type="submit">Update</button>
              <button className="location-btn-approve" type="button" onClick={closePopup}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerPackages;
