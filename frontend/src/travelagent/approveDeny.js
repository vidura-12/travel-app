import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './book.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [tourGuides, setTourGuides] = useState([]);
  const [approvedGuides, setApprovedGuides] = useState(
    JSON.parse(localStorage.getItem('approvedGuides')) || []
  );

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const response = await axios.get('http://localhost:8081/TourGuide/all');
        setTourGuides(response.data);
      } catch (error) {
        console.error('Error fetching tour guides:', error);
      }
    };

    fetchTourGuides();
  }, []);

  const handleApprove = async (id) => {
    if (window.confirm('Are you sure you want to approve this tour guide?')) {
      try {
        const approvedGuide = tourGuides.find(guide => guide._id === id);

        // Check if the guide is already approved
        if (approvedGuides.find(guide => guide._id === approvedGuide._id)) {
          alert('This tour guide has already been approved.');
          return;
        }

        // Update state and localStorage
        const updatedApprovedGuides = [...approvedGuides, approvedGuide];
        setApprovedGuides(updatedApprovedGuides);
        localStorage.setItem('approvedGuides', JSON.stringify(updatedApprovedGuides));

        alert('Tour guide approved successfully!');
      } catch (error) {
        console.error('Error approving tour guide:', error);
        alert('Failed to approve the tour guide.');
      }
    }
  };

  const handleDeny = async (id) => {
    if (window.confirm('Are you sure you want to deny this tour guide?')) {
      try {
        await axios.delete(`http://localhost:8081/TourGuide/delete/${id}`);
        setTourGuides(tourGuides.filter(guide => guide._id !== id));
        alert('Tour guide denied successfully!');
      } catch (error) {
        console.error('Error denying tour guide:', error);
        alert('Failed to deny the tour guide.');
      }
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
        overflowY: 'auto'
      }}>
        <h2 className="text-center mb-4">Tour Guides</h2>
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
                <th>Actions</th>
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
                  <td>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleApprove(guide._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeny(guide._id)}
                    >
                      Deny
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
