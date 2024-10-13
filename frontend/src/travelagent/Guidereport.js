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

  // Function to load an image and convert it to Base64
  const loadImageAsBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.crossOrigin = 'Anonymous'; // Handle cross-origin images
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg');
        resolve(dataURL);
      };
      img.onerror = reject;
    });
  };

  const generatePDFReport = async () => {
    const doc = new jsPDF();

    const logoUrl = '/img/logo.jpeg';
    const signatureUrl = '/img/sig.jpeg';

    // Add a frame (rectangle) to the PDF
    doc.setLineWidth(1); // Set the thickness of the frame
    doc.rect(10, 10, 190, 277); // Draw the rectangle (x, y, width, height)

    try {
      const [logoBase64, signatureBase64] = await Promise.all([
        loadImageAsBase64(logoUrl),
        loadImageAsBase64(signatureUrl)
      ]);

      // Add the logo
      doc.addImage(logoBase64, 'JPEG', 120, 10, 70, 30);
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(2);
      // Removed the duplicate rectangle here
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

      // Create a table in the PDF
      doc.autoTable(tableColumn, tableRows, { startY: 70 }); // Adjust startY to prevent overlap with title and images

      // Add signature
      doc.addImage(signatureBase64, 'JPEG', 20, 180, 50, 15);
      doc.text('Signature \n Tour Guide Admin', 20, 200);

      // Save the PDF
      doc.save('tour_guides_report.pdf'); // Save the PDF
    } catch (error) {
      console.error('Error loading images:', error);
    }
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
            <thead className="thead-dark" style={{ backgroundColor: '#687786', color: '#ffffff' }}>
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
