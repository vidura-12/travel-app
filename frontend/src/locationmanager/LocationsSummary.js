import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LocationsSummary.css'; // Import the custom CSS file

function LocationsSummary() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocationsSummary = async () => {
      try {
        const response = await fetch('http://localhost:8081/Location/locations-summary', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setLocations(data);
        } else {
          console.error('Error fetching locations summary:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching locations summary:', error);
      }
    };

    fetchLocationsSummary();
  }, []);

  const handleDeleteComment = async (locationId, commentId) => {
    try {
      const response = await fetch(`http://localhost:8081/Location/locations/${locationId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Locations Summary</h2>
      <table className="table table-striped">
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
  );
}

export default LocationsSummary;
