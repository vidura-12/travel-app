import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FeedbackRetrieve() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

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

  // Inline styles for the component
  const styles = {
    body: {
      backgroundImage: 'url("/img/sl51.jpg")', // Replace with your image path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      color: '#333',
      padding: '50px 0', // Top and bottom padding
    },
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // White background with transparency
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)', // Shadow effect
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
      </div>
    </div>
  );
}
