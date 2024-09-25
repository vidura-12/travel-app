import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminEventApproval() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchPendingEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/event');
        // Filter out only unapproved events
        setEvents(response.data.filter(event => !event.isApproved));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchPendingEvents();
  }, []);

  const handleApproval = async (eventId) => {
    try {
      await axios.put(`http://localhost:8081/event/approve/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
      // Optionally, show a success message
      alert('Event approved successfully!');
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };

  const handleRejection = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8081/event/delete/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
      // Optionally, show a success message
      alert('Event rejected successfully!');
    } catch (error) {
      console.error('Error rejecting event:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Pending Event Approvals</h2>
      {events.length === 0 ? (
        <p>No events pending approval.</p>
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
                    className="btn btn-success btn-sm"
                    onClick={() => handleApproval(event._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleRejection(event._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminEventApproval;
