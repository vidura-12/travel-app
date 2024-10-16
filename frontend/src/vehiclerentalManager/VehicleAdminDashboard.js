import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Header from '../com/AdminHeader'; 
import { useNavigate } from 'react-router-dom';
import './Vehicle_Admin_Home.css'; // Import the CSS file
import Swal from 'sweetalert2';
import { generateVehicleReport } from './VehicleAdminReport';

const InfoModal = ({ message, onClose }) => (
  <div>
    <div className="vehicle-overlay" onClick={onClose} />
    <div className="vehicle-modal">
      <p>{message}</p>
      <button onClick={onClose} className="vehicle-AfterClosemodalButton">Close</button>
    </div>
  </div>
);

const AdminVehicleManagement = () => {
  
  const [vehicles, setVehicles] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteVehicleId, setDeleteVehicleId] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
          text: 'You need to log in first.',
        confirmButtonText: 'OK',
        customClass: {
          icon: 'vehicle-red-icon', // Custom class for the icon
        }
      }).then(() => {
        navigate('/admin/login'); // Redirect to login page after closing the alert
        });
      return;
    }
    axios.get('http://localhost:8081/api/vehicles')
      .then(response => {
        setVehicles(response.data.data || []);
      })
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  const handleStatusChange = (vehicleId, status) => {

    // Determine button classes based on status
    const confirmButtonClass = status === 'approved' ? 'vehicle-btn-success' : 'vehicle-btn-danger'; 
    // Determine color for the status text
    const statusColor = status === 'approved' ? 'green' : 'red'; 
    const additionalMessage = status === 'rejected' ? '<span style="color: red;">This action cannot be undone!</span>' : '';

    // Show confirmation dialog
    Swal.fire({
        title: 'Are you sure?',
        html: `${additionalMessage}<br>
        Do you want to <span style="color: ${statusColor}; font-weight: bold;">${status}</span> this vehicle?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `Yes, ${status} it!`,
        cancelButtonText: 'Cancel',
        customClass: {
          confirmButton: confirmButtonClass, // Apply the determined class
          cancelButton: 'vehicle-btn-cancel' //Optional: style for the cancel button
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await axios.patch(`http://localhost:8081/api/vehicles/${vehicleId}/status`, { status });
                
                // Update the vehicle status in state
                setVehicles(vehicles.map(vehicle =>
                    vehicle._id === vehicleId ? { ...vehicle, status } : vehicle
                ));
                
                // Show success message
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: `Vehicle has been ${status} successfully`,
                  confirmButtonText: 'OK',
                  customClass: {
                    confirmButton: 'vehicle-btn-OK' // Green color for the OK button
                  }
                });
            } catch (error) {
                console.error('Error updating vehicle status:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to update vehicle status.',
                });
            }
        }
    });
  };

  const handleDeleteVehicle = (vehicleId) => {
    // Show confirmation dialog
    Swal.fire({
        title: 'Confirm Deletion?',
        html: `
            <span style="color: red;">This action cannot be undone!</span><br>
            Are you sure you want to delete this vehicle ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        customClass: {
          icon: 'vehicle-red-icon', // Custom class for the icon
          confirmButton: 'vehicle-btn-danger', // Red color for the Yes button
          cancelButton: 'vehicle-btn-success'   // Green color for the Cancel button
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8081/api/vehicles/${vehicleId}`);
                
                // Update the vehicle list
                setVehicles(vehicles.filter(vehicle => vehicle._id !== vehicleId));

                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Vehicle has been deleted successfully.',
                    confirmButtonText: 'OK',
                    customClass: {
                      confirmButton: 'vehicle-btn-OK' // Green color for the OK button
                    }
                });

                setDeleteVehicleId(null);
            } catch (error) {
                console.error('Error deleting vehicle:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to delete vehicle.',
                });
            }
        }
    });
  };

  const VehicleReport = () => {
    generateVehicleReport(vehicles);
  };

  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out and redirected to the login page.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
  }).then((result) => {
      if (result.isConfirmed) {
          // Proceed with logout
          localStorage.removeItem('token');
          localStorage.removeItem('email'); 
          sessionStorage.clear();  
          navigate('/admin/login');  
      }
  }); 
  };

  const goToHome = () => {
    navigate('/VehicleRentalHome');  
  };

  return (
    <div>
      
      <div className='vehicle-content'>
        <div className="vehicle-header">
          <h1>Admin Vehicle Management</h1>
          <div className="vehicle-headerButtons">
            <button className="vehicle-button" onClick={goToHome}>Check Vehicle Rental Home</button>
             <button className="vehicle-button2" onClick={VehicleReport}>Generate Report</button>
            </div>

        {vehicles.length === 0 ? (
          <div className="vehicle-noVehicles">No vehicles available</div>
        ) : (
          <table className="vehicle-table">
            <thead>
              <tr>
                <th className="vehicle-th">Image</th>
                <th className="vehicle-th">Owner Email</th>
                <th className="vehicle-th">Make</th>
                <th className="vehicle-th">Model</th>
                <th className="vehicle-th">Color</th>
                <th className="vehicle-th">Category</th>
                <th className="vehicle-th">Price Per Day(LKR)</th>
                <th className="vehicle-th">Status</th>
                <th className="vehicle-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr key={vehicle._id}>
                  <td className="vehicle-td">
                    <img 
                      src={vehicle.image ? `http://localhost:8081/uploads/${vehicle.image}` : '/placeholder.png'} 
                      alt={vehicle.make} 
                      className="vehicle-vehicleImageStyle" 
                    />
                  </td>
                  <td className="vehicle-td">{vehicle.ownerEmail}</td>
                  <td className="vehicle-td">{vehicle.make}</td>
                  <td className="vehicle-td">{vehicle.model}</td>
                  <td className="vehicle-td">{vehicle.color}</td>
                  <td className="vehicle-td">{vehicle.category}</td>
                  <td className="vehicle-td">LKR {vehicle.pricePerDay}</td>
                  <td className="vehicle-td">
                    {vehicle.status === 'approved' ? (
                      <button className="vehicle-approvedButton">Approved</button>
                    ) : vehicle.status === 'rejected' ? (
                      <button className="vehicle-rejectedButton">Rejected</button>
                    ) : (
                      vehicle.status
                    )}
                  </td>
                  <td className="vehicle-td">
                    {vehicle.status === 'pending' ? (
                      <>
                        <button
                          className="vehicle-actionButton vehicle-approveButton"
                          onClick={() => handleStatusChange(vehicle._id, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          className="vehicle-actionButton vehicle-rejectButton"
                          onClick={() => handleStatusChange(vehicle._id, 'rejected')}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        className="vehicle-actionButton vehicle-deleteButton"
                        //onClick={() => setDeleteVehicleId(vehicle._id)}
                        onClick={() => handleDeleteVehicle(vehicle._id)} // Call handleDeleteVehicle directly
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showModal && <InfoModal message={modalMessage} onClose={() => setShowModal(false)} />}

        {deleteVehicleId && (
  <div>
    <div className="vehicle-overlay" onClick={() => setDeleteVehicleId(null)} />
    <div className="vehicle-modal">
      <h2>Confirm Deletion</h2>
      <p className="vehicle-confirmText">Are you sure you want to delete this vehicle?</p>
      <div className="vehicle-actionButtons">
        <button onClick={() => handleDeleteVehicle(deleteVehicleId)} className="vehicle-AmodalButton">Delete</button>
        <button onClick={() => setDeleteVehicleId(null)} className="vehicle-CmodalButton">Cancel</button>
      </div>
    </div>
  </div>
)}
      </div>
      </div>
    </div>
  );
};

export default AdminVehicleManagement;
