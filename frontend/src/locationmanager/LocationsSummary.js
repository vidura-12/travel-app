import React, { useState, useEffect } from 'react';

import './LocationsSummary.css'; // Import the custom CSS file
import { useNavigate } from 'react-router-dom'; // For navigation

function LocationsSummary() {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      navigate('/admin/login'); // Redirect to login page
      return;
    }

    const fetchLocationsSummary = async () => {
      try {
        const response = await fetch('http://localhost:8081/locationAdmin/locations-summary', {
          method: 'GET',
          headers: {
            authorization: token
          },
        });
        if (response.ok) {
          const data = await response.json();
          setLocations(data);
        } else {
          console.error('Error fetching locations summary:', response.statusText);
          if (response.status === 401) {
            alert('Session expired. Please log in again.');
            localStorage.removeItem('token'); // Clear token
            navigate('/admin/login'); // Redirect to login page
          }
        }
      } catch (error) {
        console.error('Error fetching locations summary:', error);
        alert('An error occurred while fetching locations summary.');
      }
    };

    fetchLocationsSummary();
  }, [navigate]);

  const handleDeleteComment = async (locationId, commentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      navigate('/admin/login'); // Redirect to login page
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/locationAdmin/locations/${locationId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          authorization: token
        },
      });

      if (response.ok) {
        setLocations((prevLocations) =>
          prevLocations.map((location) =>
            location._id === locationId
              ? { ...location, comments: location.comments.filter((comment) => comment._id !== commentId) }
              : location
          )
        );
      } else {
        console.error('Error deleting comment:', response.statusText);
        if (response.status === 401) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token'); // Clear token
          navigate('/admin/login'); // Redirect to login page
        }
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('An error occurred while deleting the comment.');
    }
  };

  return (
    <div className='body1'>
      <div className="container mt-5">
      <h2 className="my-4">Locations Summary</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Likes</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location._id}>
              <td>{location.name}</td>
              <td>{location.likes}</td>
              <td>
                <ul className="list-unstyled">
                  {location.comments.map((comment) => (
                    <li key={comment._id} className="comment-item d-flex align-items-center">
                      <span className="comment-text">{comment.text}</span>
                      <button
                        className="btn btn-danger btn-sm ms-3"
                        onClick={() => handleDeleteComment(location._id, comment._id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default LocationsSummary;
