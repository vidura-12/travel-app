import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';


function AdminEventApproval() {
  const [events, setEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {

    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in first.');
        navigate('/admin/login'); // Redirect to login page
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
  }, []);


  const handleApproval = async (eventId) => {
    try {
      await axios.put(`http://localhost:8081/event/approve/${eventId}`);
      const approvedEvent = events.find(event => event._id === eventId);
      setApprovedEvents([...approvedEvents, { ...approvedEvent, isApproved: true }]);
      setEvents(events.filter(event => event._id !== eventId));
      alert('Event approved successfully!');
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };

  const handleRejection = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8081/event/delete/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
      alert('Event rejected successfully!');
    } catch (error) {
      console.error('Error rejecting event:', error);
    }
  };

  const handleDeleteApproved = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8081/event/delete/${eventId}`);
      setApprovedEvents(approvedEvents.filter(event => event._id !== eventId));
      alert('Approved event deleted successfully!');
    } catch (error) {
      console.error('Error deleting approved event:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Approved Events Report', 14, 22);
    
    // Prepare data for the PDF
    const tableData = approvedEvents.map(event => [
      event.name,
      event.category,
      event.description,
      event.location,
      new Date(event.date).toLocaleDateString(),
      event.time,
      event.price,
    ]);

    // Add table to the PDF
    autoTable(doc, {
      startY: 30,
      head: [['Event Name', 'Category', 'Description', 'Location', 'Date', 'Time', 'Price']],
      body: tableData,
    });

    // Save the PDF
    doc.save('approved_events_report.pdf');
  };

  return (
    <div className="container mt-5">
      <h2 style={{ color: 'black' }}>Pending Event Approvals</h2>
      {events.length === 0 ? (
        <p style={{color: 'skyblue'}}>No events pending approval.</p>
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

      <h2 style={{ color: 'black' }} className="mt-5">Approved Events</h2>
      {approvedEvents.length === 0 ? (
        <p>No approved events.</p>
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
          <button className="btn btn-primary" style={{ width: '150px' }} onClick={generatePDF}>
            Events Report
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminEventApproval;
