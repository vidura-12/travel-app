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
  const [editId, setEditId] = useState(null);
  const [editedPackage, setEditedPackage] = useState({});
  const navigate = useNavigate();

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
    const confirmDelete = window.confirm('Are you sure you want to deny this package?');
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/packageS/${id}`);
        setPackages(packages.filter((pkg) => pkg._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8081/packageS/${id}`, { approved: true });
      const approvedPackage = response.data;

      setPackages(packages.map(pkg => (pkg._id === id ? { ...pkg, approved: true } : pkg)));
      
      // Navigate to Tours and pass the approved package details
      navigate('/tours', { state: { package: approvedPackage } });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (pkg) => {
    setEditId(pkg._id);
    setEditedPackage(pkg);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedPackage({ ...editedPackage, [name]: value });
  };

  const handleImageChange = (e) => {
    setEditedPackage({ ...editedPackage, imageFile: e.target.files[0] });
  };

  const handleSave = async (id) => {
    const formData = new FormData();
    formData.append('agencyName', editedPackage.agencyName);
    formData.append('phoneNumber', editedPackage.phoneNumber);
    formData.append('email', editedPackage.email);
    formData.append('location', editedPackage.location);
    formData.append('places', editedPackage.places);
    formData.append('maxPeople', editedPackage.maxPeople);
    formData.append('price', editedPackage.price);

    if (editedPackage.imageFile) {
      formData.append('image', editedPackage.imageFile);
    }

    try {
      const response = await axios.put(`http://localhost:8081/packageS/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setPackages(packages.map(pkg => (pkg._id === id ? response.data : pkg)));
        setEditId(null);
      } else {
        throw new Error('Failed to save the changes');
      }
    } catch (err) {
      setError(err.message);
    }
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
              {packages.map((pkg) => (
                <tr key={pkg._id}>
                  {editId === pkg._id ? (
                    <>
                      <td><input name="agencyName" value={editedPackage.agencyName} onChange={handleEditChange} /></td>
                      <td><input name="phoneNumber" value={editedPackage.phoneNumber} onChange={handleEditChange} /></td>
                      <td><input name="email" value={editedPackage.email} onChange={handleEditChange} /></td>
                      <td><input name="location" value={editedPackage.location} onChange={handleEditChange} /></td>
                      <td><input name="places" value={editedPackage.places} onChange={handleEditChange} /></td>
                      <td><input name="maxPeople" value={editedPackage.maxPeople} onChange={handleEditChange} /></td>
                      <td><input name="price" value={editedPackage.price} onChange={handleEditChange} /></td>
                      <td>
                        <input type="file" onChange={handleImageChange} />
                        {editedPackage.imageFile ? (
                          <img src={URL.createObjectURL(editedPackage.imageFile)} alt={pkg.agencyName} width="100" />
                        ) : (
                          <img src={`/img/${pkg.image}`} alt={pkg.agencyName} width="100" />
                        )}
                      </td>
                      <td>
                        <button className="save-button" onClick={() => handleSave(pkg._id)}>Save</button>
                        <button className="cancel-button" onClick={() => setEditId(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
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
                          onClick={() => handleImageClick(`/img/${pkg.image}`)}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td>
                        <button className="edit-button" onClick={() => handleApprove(pkg._id)}>Approve</button>
                        <button className="delete-button" onClick={() => handleDelete(pkg._id)}>Deny</button>
                        <button className="edit-button" onClick={() => handleEditClick(pkg)}>Edit</button>
                      </td>
                    </>
                  )}
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