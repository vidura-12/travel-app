import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();   
  const userId = id ; 

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    number: '',
    experience: '',
    language: ''
  });

  // Fetch guide details
  useEffect(() => {
    if (userId) {
      const fetchGuideDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/TourGuide/${userId}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching the tour guide:', error);
        }
      };
      fetchGuideDetails();
    }
  }, [userId]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/TourGuide/update/${userId}`, formData);
      alert('Tour guide updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating the tour guide:', error);
      alert('Failed to update the tour guide.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('loggedInGuideId'); 
    alert('You have been logged out successfully!');
    navigate('/guideLog'); 
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundImage: "url('/img/all4.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        backdropFilter: 'blur(5px)',
      }}
    >
      <h2 className="mb-4" style={{ fontWeight: 'bold', color: 'black' }}>
        Tour Guide Profile
      </h2>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="bg-light rounded p-4 shadow" style={{ width: '400px' }}>
          {['name', 'email', 'address', 'number', 'experience', 'language'].map((field) => (
            <div className="mb-3" key={field}>
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          ))}
          <button className="btn btn-primary w-100" type="submit">
            Save
          </button>
        </form>
      ) : (
        <div className="bg-light rounded p-4 shadow" style={{ width: '400px' }}>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Number:</strong> {formData.number}</p>
          <p><strong>Experience:</strong> {formData.experience}</p>
          <p><strong>Language:</strong> {formData.language}</p>
          <button className="btn btn-success w-100 mt-3" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
