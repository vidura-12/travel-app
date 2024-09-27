import React, { useEffect, useState } from 'react';
import './book.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BookTourists() {
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

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tour guide?')) {
      // Filter out the guide with the given id
      const updatedGuides = tourGuides.filter(guide => guide._id !== id);
      setTourGuides(updatedGuides);
      
      // Update localStorage
      localStorage.setItem('approvedGuides', JSON.stringify(updatedGuides));
      alert('Tour guide deleted successfully!');
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
                      className="btn btn-danger"
                      onClick={() => handleDelete(guide._id)}
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
