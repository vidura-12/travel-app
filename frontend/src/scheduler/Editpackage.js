import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Editpackage = () => {
  const { id } = useParams(); // Get the package ID from the URL
  const navigate = useNavigate(); // Use navigate to redirect after successful update
  const [packageDetails, setPackageDetails] = useState({
    agencyName: '',
    phoneNumber: '',
    location: '',
    places: '',
    maxPeople: '',
    price: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the package details using the ID
    axios.get(`http://localhost:8081/packages/${id}`)
      .then((response) => {
        setPackageDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch package details');
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Update package details in the backend
    axios.put(`http://localhost:8081/packages/${id}`, packageDetails)
      .then(() => {
        alert('Package updated successfully!');
        navigate('/seller-packages'); // Redirect to seller packages list after successful update
      })
      .catch((err) => {
        setError('Failed to update package');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Edit Package: {packageDetails.agencyName}</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Agency Name</label>
          <input
            type="text"
            name="agencyName"
            value={packageDetails.agencyName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={packageDetails.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={packageDetails.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Places to Visit</label>
          <input
            type="text"
            name="places"
            value={packageDetails.places}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Max People</label>
          <input
            type="number"
            name="maxPeople"
            value={packageDetails.maxPeople}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={packageDetails.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={packageDetails.image}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Editpackage;
