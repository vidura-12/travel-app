import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PendingEvent() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/event');
        const pending = response.data.filter(event => !event.isApproved);
        setEvents(pending);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [navigate]);

  const handleDeletePending = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8081/event/delete/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
      alert('Pending event deleted successfully!');
    } catch (error) {
      console.error('Error deleting pending event:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className='pending' style={{ color: 'black' }}>Pending Events</h2>
      {events.length === 0 ? (
        <p style={{ color: 'black' }}>No pending events found.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Event Name</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Location</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{event.category}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.time}</td>
                <td>{event.price}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeletePending(event._id)}
                    title="Delete"
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Internal CSS */}
      <style jsx>{`
        .pending {
          text-align: center;
          margin-top: 100px; /* Increased top margin for more space */
          margin-bottom: 20px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        }
        table {
          margin-top: 20px;
        }
        .table {
          background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent background */
        }
        th {
          background-color: #343a40; /* Dark background for header */
          color: white; /* White text for header */
        }
        td {
          vertical-align: middle; /* Center vertically */
        }
        .btn {
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #c82333; /* Darken on hover */
        }
      `}</style>
    </div>
  );
}

export default PendingEvent;
