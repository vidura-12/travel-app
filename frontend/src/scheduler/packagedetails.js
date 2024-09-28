import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './packagedetails.css';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [editId, setEditId] = useState(null);
  const [editedPackage, setEditedPackage] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('You need to log in first.');
      navigate('/admin/login');
      return;
    }

    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:8081/packages/');
        setPackages(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPackages();
  }, [token, navigate]);

  const toggleModal = () => setModal(!modal);

  const handleImageClick = (image) => {
    setModalImage(image);
    toggleModal();
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, deny it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8081/packages/${id}`);
        setPackages(packages.filter((pkg) => pkg._id !== id));
        Swal.fire('Denied!', 'The package has been denied.', 'success');
      } catch (err) {
        setError(err.message);
        Swal.fire('Error!', err.message, 'error');
      }
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8081/packages/update/${id}`, { status: 'approved' }, {
        headers: { authorization: token }
      });

      const updatedPackages = packages.map(pkg => {
        if (pkg._id === id) {
          return { ...pkg, status: 'approved' };
        }
        return pkg;
      });

      setPackages(updatedPackages);
      Swal.fire('Approved!', 'The package has been approved.', 'success');
    } catch (error) {
      console.error('Error approving package:', error.response?.data || error.message);
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/admin/login');
      } else {
        Swal.fire('Error!', 'An error occurred while approving the package.', 'error');
      }
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
      const response = await axios.put(`http://localhost:8081/packages/${id}`, formData, {
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

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Agency Name', 'Phone Number', 'Email', 'Location', 'Places', 'Max People', 'Price', 'Status'];
    const tableRows = [];

    packages.forEach(pkg => {
      const packageData = [
        pkg.agencyName,
        pkg.phoneNumber,
        pkg.email,
        pkg.location,
        pkg.places.join(', '),
        pkg.maxPeople,
        pkg.price,
        pkg.status
      ];
      tableRows.push(packageData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text('Travel Package Details', 14, 15);
    doc.save('travel_packages_report.pdf');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='dash location-dashboard-body'>
      <div className="">
        <h1 className='title1 location-dashboard-title'>Travel Package Details</h1>
        <button className="btn btn-primary" onClick={generatePDF}>Download PDF</button>
        {packages.length === 0 ? (
          <p className='d'>No travel packages found.</p>
        ) : (
          <table className="table1 location-dashboard-table">
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
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg._id}>
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
                      className="location-table-img"
                    />
                  </td>
                  <td>{pkg.status}</td>
                  <td className="location-action-buttons">
                    <button className="location-btn-approve" onClick={() => handleApprove(pkg._id)}>Approve</button>
                    <button className="location-btn-delete" onClick={() => handleDelete(pkg._id)}>Deny</button>
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
