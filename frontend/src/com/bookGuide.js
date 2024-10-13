import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import logo from './img/logo.jpeg'; // Add your logo image path
import signature from './img/sig.jpeg'; // Add your signature image path

export default function BookGuide() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { selectedGuideId, name, address, number } = state || {};

  const handleSubmit = async () => {
    // Handle the submit logic here (like saving booking details)
    navigate('/guide', { state: { name, address, number, selectedGuideId } });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add a frame (rectangle) to the PDF
    doc.setLineWidth(1); // Set the thickness of the frame
    doc.rect(10, 10, 190, 277); // Draw the rectangle (x, y, width, height)

    // Add the logo (adjust for JPEG format)
    doc.addImage(logo, 'JPEG', 20, 20, 50, 20); // Adjust the coordinates (x, y) and size (width, height) as needed

    // Add the content to the PDF
    doc.setFontSize(18);
    doc.text('Tour Guide Booking Confirmation', 20, 50);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 70);
    doc.text(`Address: ${address}`, 20, 80);
    doc.text(`Number: ${number}`, 20, 90);

    // Add the admin's signature (adjust for JPEG format)
    doc.addImage(signature, 'JPEG', 20, 130, 50, 20); // Adjust the coordinates (x, y) and size (width, height) as needed
    doc.text('Admin Signature', 20, 155); // Optionally add a label for the signature

    // Save the PDF
    doc.save('booking-details.pdf');
  };

  return (
    <div
      style={{
        display: 'flex',
        backgroundImage: "url('/img/all4.jpg')",
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Lighter and transparent box
          borderRadius: '10px',
          color: 'rgba(0, 0, 0, 0.8)', // Black text with some transparency
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h2 style={{ marginBottom: '20px', fontSize: '2rem', color: 'rgba(0, 0, 0, 1)' }}>Tour Guide Booking Confirmation</h2>
        <p style={{ marginBottom: '20px', color: 'rgba(0, 0, 0, 0.9)' }}>You have booked a tour guide. Here are the details:</p>
        <ul style={{ listStyleType: 'none', padding: 0, color: 'rgba(0, 0, 0, 0.9)' }}>
          <li><strong>Name:</strong> {name}</li>
          <li><strong>Address:</strong> {address}</li>
          <li><strong>Number:</strong> {number}</li>
        </ul>

        {/* Confirm Booking Button */}
        <button
          style={{
            backgroundColor: '#28a745', // Bootstrap success color
            color: 'white',
            padding: '12px 24px',
            borderRadius: '5px',
            marginTop: '20px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease',
          }}
          onClick={handleSubmit}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'} // Darker green on hover
          onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'} // Original color
        >
          Confirm Booking
        </button>

        {/* Download PDF Button */}
        <button
          style={{
            backgroundColor: '#007bff', // Bootstrap primary color
            color: 'white',
            padding: '12px 24px',
            borderRadius: '5px',
            marginTop: '20px',
            marginLeft: '10px', // Add some spacing between buttons
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease',
          }}
          onClick={handleDownloadPDF}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'} // Darker blue on hover
          onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'} // Original color
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
