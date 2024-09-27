import React, { useState, useEffect } from 'react';
import './LocationsSummary.css'; // Import the custom CSS file
import { useNavigate } from 'react-router-dom'; // For navigation
import Swal from 'sweetalert2'; // Import SweetAlert

function LocationsSummary() {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      navigate('/admin/login');
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
            localStorage.removeItem('token');
            navigate('/admin/login');
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
      navigate('/admin/login');
      return;
    }

    // Use SweetAlert for confirmation
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    });

    if (isConfirmed) {
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
          Swal.fire('Deleted!', 'Your comment has been deleted.', 'success'); // Success message
        } else {
          console.error('Error deleting comment:', response.statusText);
          if (response.status === 401) {
            alert('Session expired. Please log in again.');
            localStorage.removeItem('token');
            navigate('/admin/login');
          }
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('An error occurred while deleting the comment.');
      }
    }
  };

  return (
    <div className="location-summary-body">
      <div className="location-summary-container">
        <h2 className="location-summary-title">Locations Summary</h2>
        <table className="location-summary-table">
          <thead>
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
                  <ul className="comment-list">
                    {location.comments.map((comment) => (
                      <li key={comment._id} className="comment-item">
                        <span className="comment-text">{comment.text}</span>
                        <button
                          className="location-btn-delete"
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
