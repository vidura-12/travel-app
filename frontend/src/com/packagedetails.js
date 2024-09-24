import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './packagedetails.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const navigate = useNavigate();  // Hook to navigate between routes

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:8081/packageS');
        setPackages(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const toggleModal = () => setModal(!modal);

  const handleImageClick = (image) => {
    setModalImage(image);
    toggleModal();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to deny this package?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/packageS/${id}`);
        setPackages(packages.filter((pkg) => pkg._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (pkg) => {
    // Navigate to the Tours component and pass package data
    navigate('/tours', { state: { package: pkg } });
    navigate('/editpackage', { state: { package: pkg } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='dash'>
      <div className="dashboard1">
        <h1 className='title1'>Travel Package Details</h1>
        {packages.length === 0 ? (
          <p className='d'>No travel packages found.</p>
        ) : (
          <table className="table1">
            <thead>
              <tr>
                <th>No</th> {/* Row number column */}
                <th>Agency Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Location</th>
                <th>Places</th>
                <th>Max People</th>
                <th>Price</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, index) => (
                <tr key={pkg._id}>
                  <td>{index + 1}</td> {/* Row number */}
                  <td>{pkg.agencyName}</td>
                  <td>{pkg.phoneNumber}</td>
                  <td>{pkg.email}</td>
                  <td>{pkg.location}</td>
                  <td>{pkg.places.join(', ')}</td>
                  <td>{pkg.maxPeople}</td>
                  <td>{pkg.price}</td>
                  <td>
                    <img
                      src={`/img/${pkg.image}`}
                      alt={pkg.agencyName}
                      width="100"
                      onClick={() => handleImageClick('/img/' + pkg.image)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(pkg)}>Approve</button>
                    <button className="delete-button" onClick={() => handleDelete(pkg._id)}>Deny</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal show={modal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalImage} alt="" className="img-fluid" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
