import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './packagedetails.css';
import Swal from 'sweetalert2';
import logo from './sheduler image/logo.jpeg'; // Add your logo image path
import signature from './sheduler image/sig.jpeg'; 

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
        headers: { authorization: `Bearer ${token}` }
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
  
    // Draw border for aesthetic purposes
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277);
  
    // Add the logo at the top left with adjusted size for clarity
    doc.addImage(logo, 'JPEG', 20, 15, 60, 25); // Increased width and height for clarity
  
    // Add report title
    doc.setFontSize(18);
    doc.text('Travel Package Details', 80, 30); // Centered under the logo
  
    // Get current date
   // Position the date on the top right
  
    // Define table columns and prepare rows from package data
    const tableColumn = [
      'Agency Name', 'Phone Number', 'Email', 'Location', 
      'Places', 'Max People', 'Price', 'Status'
    ];
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
  
    // Insert the table below the header (startY ensures proper positioning)
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50, // Ensure it starts after the title and logo
      theme: 'striped',
    });
  
    // Add the signature at the bottom left with reduced size
    doc.addImage(signature, 'JPEG', 20, 260, 40, 15); // Adjusted size for the signature image
    doc.setFontSize(10); // Reduced font size for the signature text
    doc.text('Scheduler Signature', 20, 280); 
    const currentDate = new Date().toLocaleDateString(); // Format the date
  
    // Add current date to the PDF
    doc.setFontSize(12); // Set font size for the date
    doc.text(`Date: ${currentDate}`, 160, 30);
    // Signature text below the image
  
    // Save the PDF
    doc.save('travel_packages_report.pdf');
  };
  
  const totalPackages = packages.length;
  const totalPrice = packages.reduce((sum, pkg) => sum + (pkg.price || 0), 0);
  const averagePrice = totalPackages > 0 ? (totalPrice / totalPackages).toFixed(2) : 0;
  

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
        <div className='cen'>
        <center>
        <button className="btn btn-primary" onClick={generatePDF}>Download PDF</button>
        </center>
        </div>
        <div className="summary">
          <p>Total Packages: {totalPackages}</p>
          <p>Average Price: ${averagePrice}</p>

        </div>
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
                  {editId === pkg._id ? (
                    <>
                      <td><input type="text" name="agencyName" value={editedPackage.agencyName} onChange={handleEditChange} /></td>
                      <td><input type="text" name="phoneNumber" value={editedPackage.phoneNumber} onChange={handleEditChange} /></td>
                      <td><input type="text" name="email" value={editedPackage.email} onChange={handleEditChange} /></td>
                      <td><input type="text" name="location" value={editedPackage.location} onChange={handleEditChange} /></td>
                      <td><input type="text" name="places" value={editedPackage.places} onChange={handleEditChange} /></td>
                      <td><input type="text" name="maxPeople" value={editedPackage.maxPeople} onChange={handleEditChange} /></td>
                      <td><input type="text" name="price" value={editedPackage.price} onChange={handleEditChange} /></td>
                      <td>
                        <input type="file" name="image" onChange={(e) => setEditedPackage({ ...editedPackage, imageFile: e.target.files[0] })} />
                      </td>
                      <td>{pkg.status}</td>
                      <td>
                        <button  className="location-btn-approve" onClick={() => handleSave(pkg._id)}>Save</button>
                        <button className="location-btn-delete" onClick={() => setEditId(null)}>Cancel</button>
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
                          className="location-table-img"
                        />
                      </td>
                      <td>{pkg.status}</td>
                      <td className="location-action-buttons">
                        <button className="location-btn-approve" onClick={() => handleApprove(pkg._id)}>Approve</button>
                        <button className="location-btn-delete" onClick={() => handleDelete(pkg._id)}>Deny</button>
                        <button className="location-btn-approve" onClick={() => handleEditClick(pkg)}>Edit</button>
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
