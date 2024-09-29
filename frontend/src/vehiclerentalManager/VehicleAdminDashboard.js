import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Header from '../com/AdminHeader'; 
import { useNavigate } from 'react-router-dom';
import './Vehicle_Admin_Home.css'; // Import the CSS file

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
    axios.get('http://localhost:8081/api/vehicles')
      .then(response => {
        setVehicles(response.data.data || []);
      })
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  const handleStatusChange = (vehicleId, status) => {
    axios.patch(`http://localhost:8081/api/vehicles/${vehicleId}/status`, { status })
      .then(response => {
        setVehicles(vehicles.map(vehicle =>
          vehicle._id === vehicleId ? { ...vehicle, status } : vehicle
        ));
        setModalMessage(`Vehicle has been ${status} successfully`);
        setShowModal(true);
      })
      .catch(error => console.error('Error updating vehicle status:', error));
  };

  const handleDeleteVehicle = (vehicleId) => {
    axios.delete(`http://localhost:8081/api/vehicles/${vehicleId}`)
      .then(response => {
        setVehicles(vehicles.filter(vehicle => vehicle._id !== vehicleId));
        setModalMessage('Vehicle has been deleted successfully');
        setShowModal(true);
        setDeleteVehicleId(null);
      })
      .catch(error => console.error('Error deleting vehicle:', error));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    sessionStorage.clear();  
    navigate('/admin/login');  
  };

  const goToHome = () => {
    navigate('/VehicleRentalHome');  
  };

  return (
    <div>
      
      <div className='vehicle-content'>
        <div className="vehicle-header">
        <div className="vehicle-headerButtons">
          <button className="vehicle-button" onClick={goToHome}>Back to Vehicle Rental Home</button>
          <button className="vehicle-button2" onClick={logout}>Logout</button>
        </div>

        <h1>Admin Vehicle Management</h1>

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
                  <td className="vehicle-td">{vehicle.email}</td>
                  <td className="vehicle-td">{vehicle.make}</td>
                  <td className="vehicle-td">{vehicle.model}</td>
                  <td className="vehicle-td">{vehicle.color}</td>
                  <td className="vehicle-td">{vehicle.category}</td>
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
                        onClick={() => setDeleteVehicleId(vehicle._id)}
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
