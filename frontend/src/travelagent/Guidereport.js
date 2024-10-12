import React, { useEffect, useState } from 'react';
import './book.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 

export default function Report() {
  const [tourGuides, setTourGuides] = useState([]);

  useEffect(() => {
    const fetchApprovedTourGuides = () => {
      try {
        const approvedGuides = JSON.parse(localStorage.getItem('approvedGuides')) || [];
        setTourGuides(approvedGuides);
      } catch (error) {
        console.error('Error fetching approved tour guides:', error);
      }
    };

    fetchApprovedTourGuides();
  }, []);

  const generatePDFReport = () => {
    const doc = new jsPDF();

    // Add a frame (rectangle) to the PDF
    doc.setLineWidth(1); // Set the thickness of the frame
    doc.rect(10, 10, 190, 277); // Draw the rectangle (x, y, width, height)

    // Add the logo
    //doc.addImage(logo, 'JPEG', 20, 20, 50, 20); // Adjust the coordinates and size as needed

    // Title
    doc.setFontSize(18);
    doc.text('Approved Tour Guides Report', 14, 50); // Adjust Y position to prevent overlap

    // Table Column
    const tableColumn = ["Name", "Email", "Address", "Number", "Experience", "Language"];
    const tableRows = [];

    // Add data to the rows
    tourGuides.forEach(guide => {
      const guideData = [
        guide.name,
        guide.email,
        guide.address,
        guide.number,
        guide.experience,
        guide.language,
      ];
      tableRows.push(guideData);
    });

    // Add the admin's signature
   // doc.addImage(signature, 'JPEG', 20, 130, 50, 20); // Adjust the coordinates and size as needed
    //doc.text('Admin Signature', 20, 155); // Optionally add a label for the signature

    // Create a table in the PDF
    doc.autoTable(tableColumn, tableRows, { startY: 70 }); // Adjust startY to prevent overlap with title and images
    doc.save('tour_guides_report.pdf'); // Save the PDF
  };

  return (
    <div style={{
      display: 'flex',
      backgroundImage: "url('/img/all2.jpeg')",
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="dashboard-container" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        width: '80%',
        maxWidth: '400%',
        height: '90vh',
        overflowY: 'auto',
        marginTop: '50px',
      }}>
        <h2 className="text-center mb-4">Approved Tour Guides</h2>
        <button className="btn btn-primary mb-3" onClick={generatePDFReport}>
          Generate PDF Report
        </button>
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-striped table-bordered" style={{ margin: '0 auto', width: '100%', minWidth: '800px' }}>
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Number</th>
                <th>Experience</th>
                <th>Language</th>
              </tr>
            </thead>
            <tbody>
              {tourGuides.map(guide => (
                <tr key={guide._id}>
                  <td>{guide.name}</td>
                  <td>{guide.email}</td>
                  <td>{guide.address}</td>
                  <td>{guide.number}</td>
                  <td>{guide.experience}</td>
                  <td>{guide.language}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}