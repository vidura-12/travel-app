import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css';

function AdminReport() {
  const [approvedEvents, setApprovedEvents] = useState([]);

  useEffect(() => {
    const fetchApprovedEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/event');
        const approved = response.data.filter(event => event.isApproved);
        setApprovedEvents(approved);
      } catch (error) {
        console.error('Error fetching approved events:', error);
      }
    };
    fetchApprovedEvents();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    
    // Add logo in the top right corner
    const logoImg = '/img/logo.jpeg'; // Path to your logo image
    const signatureImg = '/img/sig.jpeg'; // Path to your signature image
    const margin = 10; // Margin from the right edge
    const logoWidth = 50; // Logo width
    const logoHeight = 15; // Logo height

    // Calculate x position to align the logo to the right
    const xPosition = doc.internal.pageSize.getWidth() - logoWidth - margin;
    doc.addImage(logoImg, 'JPEG', xPosition, 10, logoWidth, logoHeight); // Logo position and size
    doc.text('Approved Events Report', 14, 30);
    
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
      startY: 50, // Adjust startY to avoid overlapping with images
      head: [['Event Name', 'Category', 'Description', 'Location', 'Date', 'Time', 'Price']],
      body: tableData,
    });

    // Add a border around the PDF page
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10); // Adjust for margin

    // Add signature below the table
    doc.addImage(signatureImg, 'JPEG', 10, doc.autoTable.previous.finalY + 10, 50, 15); // Signature position and size
    
    // Add "Admin Signature" text below the signature
    doc.setFontSize(10); // Decrease font size for "Admin Signature"
    doc.text('Admin Signature', 10, doc.autoTable.previous.finalY + 30); // Adjust position for the text

    // Save the PDF
    doc.save('approved_events_report.pdf');
  };

  return (
    <div className='AdminBack'>
      <div className="event-dashboard-container mt-5">
        <h2 className="event-dashboard-title">Approved Events</h2>
        {approvedEvents.length === 0 ? (
          <p style={{ color: 'skyblue' }}>No approved events.</p>
        ) : (
          <table className="event-dashboard-table table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Event Name</th>
                <th scope="col">Category</th>
                <th scope="col">Description</th>
                <th scope="col">Location</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Price(RS)</th>
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
                  <td>{event.price}.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button className="event-btn-report" onClick={generatePDF}>Generate Report</button>

        <style>{`
          .AdminBack {
            background-image: url('/img/event8.jpg'); /* Path to your background image */
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100vh;
            padding: 120px;
            color: white; /* Adjust text color for better visibility */
          }

          .event-dashboard-container {
            background-color: rgba(255, 255, 255, 0.8); /* Set the transparency level here */
            padding: 20px; /* Optional padding */
            border-radius: 8px; /* Optional border radius for aesthetics */
          }
        `}</style>
      </div>
    </div>
  );
}

export default AdminReport;
