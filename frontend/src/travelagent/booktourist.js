import React, { useEffect, useState } from 'react';
import './book.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BookTourists() {
  const [tourGuides, setTourGuides] = useState([]);
  const [editId, setEditId] = useState(null); // Track which guide is being edited
  const [formData, setFormData] = useState({}); // Track form data for editing

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
      const updatedGuides = tourGuides.filter(guide => guide._id !== id);
      setTourGuides(updatedGuides);
      localStorage.setItem('approvedGuides', JSON.stringify(updatedGuides));
      alert('Tour guide deleted successfully!');
    }
  };

  const handleEditClick = (guide) => {
    setEditId(guide._id); // Set the ID of the guide being edited
    setFormData(guide); // Populate the form data with the current values
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (id) => {
    const updatedGuides = tourGuides.map(guide =>
      guide._id === id ? { ...guide, ...formData } : guide
    );

    setTourGuides(updatedGuides);
    localStorage.setItem('approvedGuides', JSON.stringify(updatedGuides));
    setEditId(null); // Exit edit mode
    alert('Tour guide updated successfully!');
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
                  <td>
                    {editId === guide._id ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    ) : (
                      guide.name
                    )}
                  </td>
                  <td>
                    {editId === guide._id ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    ) : (
                      guide.email
                    )}
                  </td>
                  <td>
                    {editId === guide._id ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    ) : (
                      guide.address
                    )}
                  </td>
                  <td>
                    {editId === guide._id ? (
                      <input
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                      />
                    ) : (
                      guide.number
                    )}
                  </td>
                  <td>
                    {editId === guide._id ? (
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                      />
                    ) : (
                      guide.experience
                    )}
                  </td>
                  <td>
                    {editId === guide._id ? (
                      <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                      />
                    ) : (
                      guide.language
                    )}
                  </td>
                  <td>
                    {editId === guide._id ? (
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleSave(guide._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleEditClick(guide)}
                      >
                        Edit
                      </button>
                    )}
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