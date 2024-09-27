import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD

=======
import Swal from 'sweetalert2';
import './AdminEventApproval.css'; // Import the CSS file
>>>>>>> origin/Final

function AdminEventApproval() {
  const [events, setEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const navigate = useNavigate();

<<<<<<< HEAD

  useEffect(() => {

=======
  useEffect(() => {
>>>>>>> origin/Final
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in first.');
<<<<<<< HEAD
        navigate('/admin/login'); // Redirect to login page
=======
        navigate('/admin/login');
>>>>>>> origin/Final
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
<<<<<<< HEAD
  }, []);


  const handleApproval = async (eventId) => {
    try {
      await axios.put(`http://localhost:8081/event/approve/${eventId}`);
      const approvedEvent = events.find(event => event._id === eventId);
      setApprovedEvents([...approvedEvents, { ...approvedEvent, isApproved: true }]);
      setEvents(events.filter(event => event._id !== eventId));
      alert('Event approved successfully!');
=======
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
>>>>>>> origin/Final
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };

  const handleRejection = async (eventId) => {
    try {
<<<<<<< HEAD
      await axios.delete(`http://localhost:8081/event/delete/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
      alert('Event rejected successfully!');
=======
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
>>>>>>> origin/Final
    } catch (error) {
      console.error('Error rejecting event:', error);
    }
  };

  const handleDeleteApproved = async (eventId) => {
    try {
<<<<<<< HEAD
      await axios.delete(`http://localhost:8081/event/delete/${eventId}`);
      setApprovedEvents(approvedEvents.filter(event => event._id !== eventId));
      alert('Approved event deleted successfully!');
=======
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
>>>>>>> origin/Final
    } catch (error) {
      console.error('Error deleting approved event:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Approved Events Report', 14, 22);
<<<<<<< HEAD
    
    // Prepare data for the PDF
=======

>>>>>>> origin/Final
    const tableData = approvedEvents.map(event => [
      event.name,
      event.category,
      event.description,
      event.location,
      new Date(event.date).toLocaleDateString(),
      event.time,
      event.price,
    ]);

<<<<<<< HEAD
    // Add table to the PDF
=======
>>>>>>> origin/Final
    autoTable(doc, {
      startY: 30,
      head: [['Event Name', 'Category', 'Description', 'Location', 'Date', 'Time', 'Price']],
      body: tableData,
    });

<<<<<<< HEAD
    // Save the PDF
=======
>>>>>>> origin/Final
    doc.save('approved_events_report.pdf');
  };

  return (
<<<<<<< HEAD
    <div className="container mt-5">
      <h2 style={{ color: 'black' }}>Pending Event Approvals</h2>
      {events.length === 0 ? (
        <p style={{color: 'skyblue'}}>No events pending approval.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
=======
    <div className="event-container">
      <h2 className="event-heading">Pending Event Approvals</h2>
      {events.length === 0 ? (
        <p className="event-no-data">No events pending approval.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="event-table-head">
>>>>>>> origin/Final
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
<<<<<<< HEAD
                    className="btn btn-success btn-sm"
=======
                    className="btn event-approve-btn btn-sm"
>>>>>>> origin/Final
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

<<<<<<< HEAD
      <h2 style={{ color: 'black' }} className="mt-5">Approved Events</h2>
      {approvedEvents.length === 0 ? (
        <p>No approved events.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
=======
      <h2 className="event-approved-heading">Approved Events</h2>
      {approvedEvents.length === 0 ? (
        <p className="event-no-data">No approved events.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="event-table-head">
>>>>>>> origin/Final
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
<<<<<<< HEAD
      
      {approvedEvents.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-primary" style={{ width: '150px' }} onClick={generatePDF}>
=======

      {approvedEvents.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-primary event-report-btn" onClick={generatePDF}>
>>>>>>> origin/Final
            Events Report
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminEventApproval;
