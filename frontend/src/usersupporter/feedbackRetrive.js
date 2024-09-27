import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FeedbackRetrieve() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [sortedFeedbacks, setSortedFeedbacks] = useState([]);

  // Fetch feedback data from the backend when the component mounts
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:8081/FeedBack/all');
        setFeedbacks(response.data);
        setFilteredFeedbacks(response.data); // Initialize with all feedbacks
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value) {
      const filtered = feedbacks.filter(feedback =>
        feedback.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFeedbacks(filtered);
    } else {
      setFilteredFeedbacks(feedbacks); // Reset to all feedbacks if search is empty
    }
  };

  // Function to handle deletion of feedback
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/FeedBack/delete/${id}`);
      setFeedbacks(prevFeedbacks => prevFeedbacks.filter(feedback => feedback._id !== id));
      setFilteredFeedbacks(prevFeedbacks => prevFeedbacks.filter(feedback => feedback._id !== id));
      console.log('Feedback deleted successfully');
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  // Function to generate PDF
  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    const logoUrl = '/img/logo.jpeg';  
    const signatureUrl = '/img/sig.jpeg'; 

    const loadImageAsBase64 = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = url;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg'));
        };
        img.onerror = (error) => {
          console.error(`Error loading image from ${url}:`, error);
          reject(error);
        };
      });
    };

    try {
      const [logoBase64, signatureBase64] = await Promise.all([
        loadImageAsBase64(logoUrl),
        loadImageAsBase64(signatureUrl)
      ]);

      doc.addImage(logoBase64, 'JPEG', 120, 10, 70, 30); 
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(2);
      doc.rect(10, 10, 190, 250);

      doc.setFontSize(16);
      doc.text('All Feedbacks', 20, 60);

      const tableData = filteredFeedbacks.map(feedback => [
        feedback.name,
        feedback.email,
        feedback.contact,
        feedback.feedbackCategory,
        feedback.comment,
      ]);

      const columns = ['Name', 'Email', 'Contact', 'Category', 'Feedback'];

      // Calculate table width
      const tableWidth = doc.internal.pageSize.getWidth() - 20; // 10 margin on both sides
      const columnWidths = columns.map(col => doc.getTextWidth(col) + 10); // Adding padding
      const totalColumnWidth = columnWidths.reduce((acc, width) => acc + width, 0);

      // Centering the table
      const marginLeft = (tableWidth - totalColumnWidth) / 2;

      // Add the table to the PDF with adjusted starting Y position and margin
      doc.autoTable({
        head: [columns],
        body: tableData,
        startY: 70,
        margin: { left: 20, right: 20 }, // Adjust left margin for centering
      });

      doc.addImage(signatureBase64, 'JPEG', 20, doc.lastAutoTable.finalY + 10, 50, 15);
      doc.text('\n Signature \n Customer Affairs Admin', 20, doc.lastAutoTable.finalY + 25);
      doc.save('feedbacks.pdf');
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  // Function to handle sorting feedbacks by category
  const handleSortByCategory = () => {
    const sorted = [...filteredFeedbacks].sort((a, b) => {
      if (a.feedbackCategory < b.feedbackCategory) return -1;
      if (a.feedbackCategory > b.feedbackCategory) return 1;
      return 0;
    });
    setSortedFeedbacks(sorted);
  };

  // Inline styles for the component
  const styles = {
    body: {
      backgroundImage: 'url("/img/sl51.jpg")', // Replace with your image path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      color: '#333',
      padding: '130px 0', // Top and bottom padding
    },
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)', // White background with transparency
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)', // Shadow effect
      marginTop: '50px', // Reduced margin to move the white box slightly down
    },
    table: {
      marginTop: '20px', // Margin for the table
    },
    tableHeader: {
      textAlign: 'center',
      backgroundColor: '#343a40', // Bootstrap dark grey color
      color: '#FFF', // Text color for table headers
    },
    tableCell: {
      textAlign: 'center', // Center text in table cells
    },
  };

  return (
    <div style={styles.body}>
      <div className="container mt-5" style={styles.container}>
        <h2 className="text-center mb-4">All Feedbacks</h2>

        {/* Search Bar placed above the entire table section */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by email..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="table-responsive" style={styles.table}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>Contact</th>
                <th style={styles.tableHeader}>Category</th>
                <th style={styles.tableHeader}>Feedback</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td style={styles.tableCell}>{feedback.name}</td>
                  <td style={styles.tableCell}>{feedback.email}</td>
                  <td style={styles.tableCell}>{feedback.contact}</td>
                  <td style={styles.tableCell}>{feedback.feedbackCategory}</td>
                  <td style={styles.tableCell}>{feedback.comment}</td>
                  <td style={styles.tableCell}>
                    <button
                      className="btn btn-success" // Bootstrap class for dark green
                      onClick={() => handleDelete(feedback._id)} // Call handleDelete with the feedback ID
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Buttons for Download PDF and Sort by Category */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          {/* Download PDF Button */}
          <button className="btn btn-dark text-white" onClick={handleDownloadPDF}>
            Download PDF
          </button>

          {/* Sort by Category Button */}
          <button className="btn btn-dark text-white ms-2" onClick={handleSortByCategory}>
            Sort by Category
          </button>
        </div>

        {/* Display sorted feedbacks in separate tables */}
        {sortedFeedbacks.length > 0 && (
          <div className="mt-4">
            {Array.from(new Set(sortedFeedbacks.map(f => f.feedbackCategory))).map(category => (
              <div key={category} className="mt-4">
                <h3 className="text-center">{category}</h3>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Name</th>
                      <th style={styles.tableHeader}>Email</th>
                      <th style={styles.tableHeader}>Contact</th>
                      <th style={styles.tableHeader}>Feedback</th>
                      <th style={styles.tableHeader}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedFeedbacks.filter(feedback => feedback.feedbackCategory === category).map((feedback) => (
                      <tr key={feedback._id}>
                        <td style={styles.tableCell}>{feedback.name}</td>
                        <td style={styles.tableCell}>{feedback.email}</td>
                        <td style={styles.tableCell}>{feedback.contact}</td>
                        <td style={styles.tableCell}>{feedback.comment}</td>
                        <td style={styles.tableCell}>
                          <button
                            className="btn btn-success" // Bootstrap class for dark green
                            onClick={() => handleDelete(feedback._id)} // Call handleDelete with the feedback ID
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
