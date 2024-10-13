import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './location.css';
import { useNavigate } from 'react-router-dom'; // For navigation
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2'; // Import SweetAlert2

const LocationTable = () => {
  const [locations, setLocations] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  useEffect(() => {
    const fetchLocations = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in first.');
        navigate('/admin/login'); // Redirect to login page
        return;
      }

      try {
        const response = await axios.get('http://localhost:8081/locationAdmin/', {
          headers: {
            authorization: token
          }
        });
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token'); // Clear token
          navigate('/admin/login'); // Redirect to login page
        }
      }
    };

    fetchLocations();
  }, [navigate]);

  const handleApprove = async (locationId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      navigate('/admin/login'); // Redirect to login page
      return;
    }

    // SweetAlert confirmation for approve action
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to approve this location?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'No, cancel!',
    });

    if (!isConfirmed) return; // If user cancels, stop the function

    try {
      await axios.put(`http://localhost:8081/locationAdmin/update/${locationId}`, {
        status: 'approved',
      }, {
        headers: {
          authorization: token
        }
      });
      const updatedLocations = locations.map(location => {
        if (location._id === locationId) {
          return { ...location, status: 'approved' };
        }
        return location;
      });
      setLocations(updatedLocations);
      Swal.fire('Approved!', 'The location has been approved.', 'success'); // Success alert
    } catch (error) {
      console.error('Error approving location:', error);
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token'); // Clear token
        navigate('/admin/login'); // Redirect to login page
      }
    }
  };

  const handleDelete = async (locationId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      navigate('/admin/login'); // Redirect to login page
      return;
    }

    // SweetAlert confirmation for delete action
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this location?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (!isConfirmed) return; // If user cancels, stop the function

    try {
      await axios.delete(`http://localhost:8081/locationAdmin/delete/${locationId}`, {
        headers: {
          authorization: token // Include the token in the request header
        }
      });
      const updatedLocations = locations.filter(location => location._id !== locationId);
      setLocations(updatedLocations);
      Swal.fire('Deleted!', 'The location has been deleted.', 'success'); // Success alert
    } catch (error) {
      console.error('Error deleting location:', error);
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token'); // Clear token
        navigate('/admin/login'); // Redirect to login page
      }
    }
  };

  const toggleModal = () => setModal(!modal);

  const handleImageClick = (image) => {
    setModalImage(image);
    toggleModal();
  };

  const downloadReport = async () => {
    const doc = new jsPDF();
  
    // Load the logo and signature images
    const logo = await import('./img/ll.png'); // Adjust the path if necessary
    const sign = await import('./img/sign.jpg'); // Path to the admin's signature image
  
    const logoImg = new Image();
    const signImg = new Image();
  
    // Load and add logo image
    logoImg.src = logo.default;
    logoImg.onload = () => {
      // Add logo in the top-right corner
      doc.addImage(logoImg, 'PNG', 150, 10, 50, 20); // Adjust position and size as needed
  
      // Add a border frame
      doc.rect(5, 5, 200, 287, 'S'); // Adjust size and position for the border
  
      // Add watermark
      doc.setFontSize(60);
      doc.setTextColor(200, 200, 200); // Light grey color for watermark
      doc.text('SL HOLIDAYS', 105, 150, { align: 'center', angle: 45 }); // Centered and rotated watermark
  
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 0); // Black color for the title
      doc.text('Location Report', 10, 40);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // Reset text color to black for normal text
  
      // Define table headers and data (without Picture column)
      const headers = ['Name', 'City', 'Description', 'Added By', 'Status'];
      const data = locations.map(location => [
        location.name,
        location.city,
        location.description,
        location.addedBy || 'Unknown',
        location.status
      ]);
  
      // Generate table with adjusted column widths
      doc.autoTable({
        head: [headers],
        body: data,
        startY: 50, // Adjust starting Y position if needed
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] }, // White text on header
        styles: { cellPadding: 2, fontSize: 10 },
        columnStyles: {
          2: { cellWidth: 60 }, // Increase width for the 'Description' column
        },
      });
  
      // Load and add signature image after the table
      signImg.src = sign.default;
      signImg.onload = () => {
        // Calculate Y position after the table
        const finalY = doc.autoTable.previous.finalY + 10; // Space after the table
  
        doc.addImage(signImg, 'PNG', 10, finalY, 40, 20); // Add signature
  
        // Add location manager name below the signature
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Ensure the name shows below the signature
        doc.text('Location Manager: John Doe', 10, finalY + 25); 
  
        // Save the PDF
        doc.save('Location_Report.pdf');
      };
  
      signImg.onerror = () => {
        console.error('Failed to load the signature image.');
        const finalY = doc.autoTable.previous.finalY + 10;
        doc.text('Location Manager: John Doe', 10, finalY); // Add name if image fails
        doc.save('Location_Report.pdf');
      };
    };
  
    // Handle logo loading errors
    logoImg.onerror = () => {
      console.error('Failed to load the logo image.');
      doc.text('Location Report', 10, 40);
      doc.save('Location_Report.pdf');
    };
  };
  
  

  return (
    <div className="location-dashboard-body">
      <div className="location-dashboard-container">
        <h2 className="location-dashboard-title">Location Details</h2>
        
        <table className="location-dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Description</th>
              <th>Picture</th>
              <th>Added By</th> {/* New column for Username */}
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(location => (
              <tr key={location._id}>
                <td>{location.name}</td>
                <td>{location.city}</td>
                <td>{location.description}</td>
                <td>
                  {location.picture && (
                    <img
                      src={`/img/${location.picture}`}
                      alt={location.name}
                      className="location-table-img"
                      onClick={() => handleImageClick(`/img/${location.picture}`)}
                    />
                  )}
                </td>
                <td>{location.addedBy || 'Unknown'}</td> {/* Displaying username */}
                <td className={`location-status-${location.status}`}>{location.status}</td>
                <td className="location-action-buttons">
                  {location.status !== 'approved' && (
                    <button className="location-btn-approve" onClick={() => handleApprove(location._id)}>Approve</button>
                  )}
                  <button className="location-btn-delete" onClick={() => handleDelete(location._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modal && (
          <div className="location-modal-overlay" onClick={toggleModal}>
            <div className="location-modal-content">
              <img src={modalImage} alt="Location" className="location-modal-img" />
            </div>
          </div>
        )}
        <button className="location-btn-report" onClick={downloadReport}>
          Download Report
        </button>
      </div>
      
    </div>
  );
};

export default LocationTable;