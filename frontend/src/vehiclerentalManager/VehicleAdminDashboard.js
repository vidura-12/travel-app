import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  


const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  headerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  },


  button2: {
    padding: '10px 15px',
    backgroundColor: '#de6e05',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff'
  },
  th: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left'
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd'
  },
  actionButton: {
    padding: '5px 10px',
    border: 'none',
    borderRadius: '3px',
    color: '#fff',
    cursor: 'pointer',
    margin: '0 5px',
    fontSize: '14px'
  },
  approveButton: {
    backgroundColor: '#28a745'
  },
  rejectButton: {
    backgroundColor: '#dc3545'
  },
  approvedButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '3px',
    border: 'none',
    cursor: 'default',
    fontSize: '14px',
    pointerEvents: 'none'
  },
  rejectedButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '3px',
    border: 'none',
    cursor: 'default',
    fontSize: '14px',
    pointerEvents: 'none'
  },
  noVehicles: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px'
  },
  vehicleImageStyle: {
    width: '100px',
    height: 'auto',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: '1000',
    borderRadius: '12px',
    textAlign: 'center',
    width: '300px'
  },
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: '999',
  },
  modalButton: {
    padding: '8px 12px',
    marginTop: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

const Modal = ({ message, onClose }) => (
  <div>
    <div style={styles.overlay} onClick={onClose} />
    <div style={styles.modal}>
      <p>{message}</p>
      <button onClick={onClose} style={styles.modalButton}>Close</button>
    </div>
  </div>
);

const AdminVehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {

    // Check if user is logged in

    const fetchVehicles = async () => {

      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in first.');
        navigate('/admin/login');
       return;
      }

      try {
        const response = await axios.get('http://localhost:8081/api/vehicles', {
          headers: {
            authorization: token
          }
        });
        setVehicles(response.data.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/admin/login');
        }
      }
    };


    // Fetch vehicles from API
    axios.get('http://localhost:8081/api/vehicles')
      .then(response => {
        setVehicles(response.data.data || []);
      })
      .catch(error => console.error('Error fetching vehicles:', error));

      fetchVehicles();
  }, [navigate]);

  const handleStatusChange = (vehicleId, status) => {
    axios.patch(`http://localhost:8081/api/vehicles/${vehicleId}/status`, { status })
      .then(response => {
        setVehicles(vehicles.map(vehicle =>
          vehicle._id === vehicleId ? { ...vehicle, status } : vehicle
        ));
        setModalMessage(`Vehicle has been ${status}`);
        setShowModal(true);
      })
      .catch(error => console.error('Error updating vehicle status:', error));
  };

  const logout = () => {
    // Remove token and user info from storage
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    sessionStorage.clear();  // Clear session storage if needed
    navigate('/admin/login');  // Redirect to login page
  };

  const goToHome = () => {
    navigate('/vehicleRentalHome');  
  };

  return (
    <div>
      <div className='content'>
        <div style={styles.headerButtons}>
          <button style={styles.button} onClick={goToHome}>Back to Home</button>
          {/* Logout button uncommented and functional */}
          <button style={styles.button2} onClick={logout}>Logout</button>
        </div>

        <h1>Admin Vehicle Management</h1>

        {vehicles.length === 0 ? (
          <div style={styles.noVehicles}>No vehicles available</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Make</th>
                <th style={styles.th}>Model</th>
                <th style={styles.th}>Color</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr key={vehicle._id}>
                  <td style={styles.td}>
                    <img 
                      src={vehicle.image ? `http://localhost:8081/uploads/${vehicle.image}` : '/placeholder.png'} 
                      alt={vehicle.make} 
                      style={styles.vehicleImageStyle} 
                    />
                  </td>
                  <td style={styles.td}>{vehicle.make}</td>
                  <td style={styles.td}>{vehicle.model}</td>
                  <td style={styles.td}>{vehicle.color}</td>
                  <td style={styles.td}>{vehicle.category}</td>
                  <td style={styles.td}>
                    {vehicle.status === 'approved' ? (
                      <button style={styles.approvedButton}>Approved</button>
                    ) : vehicle.status === 'rejected' ? (
                      <button style={styles.rejectedButton}>Rejected</button>
                    ) : (
                      vehicle.status
                    )}
                  </td>
                  <td style={styles.td}>
                    {vehicle.status === 'pending' ? (
                      <>
                        <button
                          style={{ ...styles.actionButton, ...styles.approveButton }}
                          onClick={() => handleStatusChange(vehicle._id, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          style={{ ...styles.actionButton, ...styles.rejectButton }}
                          onClick={() => handleStatusChange(vehicle._id, 'rejected')}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>No actions available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default AdminVehicleManagement;