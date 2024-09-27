import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AdminEventApproval.css'; // Import the CSS file

function AdminEventApproval() {
  const [events, setEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in first.');
        navigate('/admin/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8081/event');
        const pending = response.data.filter(event => !event.isApproved);
        const approved = response.data.filter(event => event.isApproved);
        setEvents(pending);
        setApprovedEvents(approved);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [navigate]);

  const handleApproval = async (eventId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to approve this event?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, approve it!'
      });
      if (result.isConfirmed) {
        await axios.put(`http://localhost:8081/event/approve/${eventId}`);
        const approvedEvent = events.find(event => event._id === eventId);
        setApprovedEvents([...approvedEvents, { ...approvedEvent, isApproved: true }]);
        setEvents(events.filter(event => event._id !== eventId));
        Swal.fire('Approved!', 'Event has been approved.', 'success');
      }
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };

  const handleRejection = async (eventId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to reject this event?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reject it!'
      });
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8081/event/delete/${eventId}`);
        setEvents(events.filter(event => event._id !== eventId));
        Swal.fire('Rejected!', 'Event has been rejected.', 'success');
      }
    } catch (error) {
      console.error('Error rejecting event:', error);
    }
  };

  const handleDeleteApproved = async (eventId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this approved event?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8081/event/delete/${eventId}`);
        setApprovedEvents(approvedEvents.filter(event => event._id !== eventId));
        Swal.fire('Deleted!', 'Approved event has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting approved event:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Approved Events Report', 14, 22);

    const tableData = approvedEvents.map(event => [
      event.name,
      event.category,
      event.description,
      event.location,
      new Date(event.date).toLocaleDateString(),
      event.time,
      event.price,
    ]);

    autoTable(doc, {
      startY: 30,
      head: [['Event Name', 'Category', 'Description', 'Location', 'Date', 'Time', 'Price']],
      body: tableData,
    });

    doc.save('approved_events_report.pdf');
  };

  return (
    <div className="event-container">
      <h2 className="event-heading">Pending Event Approvals</h2>
      {events.length === 0 ? (
        <p className="event-no-data">No events pending approval.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="event-table-head">
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
                    className="btn event-approve-btn btn-sm"
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

      <h2 className="event-approved-heading">Approved Events</h2>
      {approvedEvents.length === 0 ? (
        <p className="event-no-data">No approved events.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="event-table-head">
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
            {approvedEvents.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{event.category}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.time}</td>
                <td>{event.price}</td>
                <td>
                  <span className="badge badge-success" style={{ backgroundColor: 'green', color: 'white' }}>
                    Approved
                  </span>
                  <button
                    className="btn btn-light btn-sm ml-2"
                    onClick={() => handleDeleteApproved(event._id)}
                    title="Delete"
                  >
                    <FaTrash style={{ color: 'black' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {approvedEvents.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-primary event-report-btn" onClick={generatePDF}>
            Events Report
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminEventApproval;
