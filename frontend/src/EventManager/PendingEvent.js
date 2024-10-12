import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert

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
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this pending event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8081/event/delete/${eventId}`);
          setEvents(events.filter(event => event._id !== eventId));
          Swal.fire('Deleted!', 'The pending event has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting pending event:', error);
          Swal.fire('Error!', 'There was an issue deleting the event.', 'error');
        }
      }
    });
  };

  const handleApproveEvent = async (eventId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to approve this event?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`http://localhost:8081/event/approve/${eventId}`);
          setEvents(events.filter(event => event._id !== eventId));
          Swal.fire('Approved!', 'The event has been approved.', 'success');
        } catch (error) {
          console.error('Error approving event:', error);
          Swal.fire('Error!', 'There was an issue approving the event.', 'error');
        }
      }
    });
  };

  return (
    <div className="pending-container mt-5">
      <h2 className="pending-title">WAiting for Approval...</h2>
      {events.length === 0 ? (
        <p className="pending-no-events">No pending events found.</p>
      ) : (
        <table className="pending-table">
          <thead className="pending-thead">
            <tr>
              <th>Event Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event._id} className={index % 2 === 0 ? 'pending-even-row' : 'pending-odd-row'}>
                <td>{event.name}</td>
                <td>{event.category}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.time}</td>
                <td>{event.price}</td>
                <td>
                  <button
                    className="pending-btn-delete"
                    onClick={() => handleDeletePending(event._id)}
                    title="Delete"
                  >
                    <FaTrash className="pending-trash-icon" />
                  </button>
                  {/* <button
                    className="pending-btn-approve"
                    onClick={() => handleApproveEvent(event._id)}
                    title="Approve"
                    style={{ marginLeft: '10px', backgroundColor: '#28a745', color: 'white' }}
                  >
                    Approve
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Internal CSS */}
      <style jsx>{`
        .pending-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-image: url('/img/event7.jpg'); /* Background image */
          background-size: cover;
          background-position: center;
          padding: 20px;
          min-height: 100vh;
        }
        .pending-title {
          text-align: center;
          margin-top: 100px; 
          margin-bottom: 20px;
          color: white;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        }
        .pending-no-events {
          color: white;
        }
        .pending-table {
          width: 80%;
          margin-top: 20px;
          background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent background */
          border-collapse: collapse;
        }
        .pending-thead {
          background-color: black; /* Header background */
          color: white; /* Header text color */
        }
        th, td {
          padding: 10px;
          text-align: center;
        }
        .pending-btn-delete {
          background-color: #dc3545;
          border: none;
          color: white;
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s;
        }
        .pending-btn-delete:hover {
          background-color: #c82333;
        }
        .pending-even-row {
          background-color: #f2f2f2;
        }
        .pending-odd-row {
          background-color: #ffffff;
        }
        .pending-trash-icon {
          pointer-events: none; /* Prevents icon from triggering the click */
        }
        .pending-btn-approve {
          background-color: #28a745;
          border: none;
          color: white;
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s;
        }
        .pending-btn-approve:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
}

export default PendingEvent;
