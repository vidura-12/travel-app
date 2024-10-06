import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HotelAdminDashboard.css';

// Modal component for notifications and confirmations
const InfoModal = ({ message, onClose }) => (
  <div>
    <div className="hotel-overlay" onClick={onClose} />
    <div className="hotel-modal">
      <p>{message}</p>
      <button onClick={onClose} className="hotel-AfterClosemodalButton">Close</button>
    </div>
  </div>
);

const AdminHotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteHotelId, setDeleteHotelId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHotels = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in first.');
        navigate('/admin/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8081/api/hotels/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHotels(response.data || []);
      } catch (error) {
        console.error('Error fetching all hotels:', error);
        if (error.response && error.response.status === 401) {
          alert('Unauthorized access. Please log in again.');
          logout();
        } else {
          setModalMessage('Failed to fetch hotels. Please try again later.');
          setShowModal(true);
        }
      }
    };

    fetchAllHotels();
  }, [navigate]);

  const handleStatusChange = async (hotelId, status) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      navigate('/admin/login');
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:8081/api/hotels/${hotelId}/${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setHotels(prevHotels =>
          prevHotels.map(hotel =>
            hotel._id === hotelId ? { ...hotel, status } : hotel
          )
        );
        setModalMessage(`Hotel has been ${status} successfully`);
        setShowModal(true);
      } else {
        setModalMessage(`Failed to ${status} the hotel. Please try again.`);
        setShowModal(true);
      }
    } catch (error) {
      console.error(`Error updating hotel status to ${status}:`, error);
      setModalMessage(`Failed to ${status} the hotel. Please try again.`);
      setShowModal(true);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      navigate('/admin/login');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8081/api/hotels/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setHotels(prevHotels => prevHotels.filter(hotel => hotel._id !== hotelId));
        setModalMessage('Hotel has been deleted successfully');
        setShowModal(true);
        setDeleteHotelId(null);
      } else {
        setModalMessage('Failed to delete the hotel. Please try again.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
      setModalMessage('Failed to delete the hotel. Please try again.');
      setShowModal(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    sessionStorage.clear();
    navigate('/admin/login');
  };

  const goToHome = () => {
    navigate('/HotelBookingHome');
  };

  return (
    <div>
      <div className='hotel-content'>
        <div className="hotel-header">
          <div className="hotel-headerButtons">
            
          </div>

          <h1>Admin Hotel Management</h1>

          {hotels.length === 0 ? (
            <div className="hotel-noHotels">No hotels available</div>
          ) : (
            <table className="hotel-table">
              <thead>
                <tr>
                  <th className="hotel-th">Image</th>
                  <th className="hotel-th">Hotel Name</th>
                  <th className="hotel-th">Location</th>
                  <th className="hotel-th">Owner Email</th>
                  <th className="hotel-th">Rooms</th>
                  <th className="hotel-th">Status</th>
                  <th className="hotel-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map(hotel => (
                  <tr key={hotel._id}>
                    <td className="hotel-td">
                      <img
                        src={hotel.images && hotel.images[0] ? `http://localhost:8081/uploads/${hotel.images[0]}` : '/placeholder.png'}
                        alt={hotel.name}
                        className="hotel-hotelImageStyle"
                      />
                    </td>
                    <td className="hotel-td">{hotel.name}</td>
                    <td className="hotel-td">{hotel.location}</td>
                    <td className="hotel-td">{hotel.owner?.email || 'N/A'}</td>
                    <td className="hotel-td">{hotel.rooms?.length || 0} types</td>
                    <td className="hotel-td">
                      {hotel.status === 'approved' ? (
                        <button className="hotel-approvedButton">Approved</button>
                      ) : hotel.status === 'rejected' ? (
                        <button className="hotel-rejectedButton">Rejected</button>
                      ) : (
                        <span>{hotel.status}</span>
                      )}
                    </td>
                    <td className="hotel-td">
                      {hotel.status === 'pending' ? (
                        <>
                          <button
                            className="hotel-actionButton hotel-approveButton"
                            onClick={() => handleStatusChange(hotel._id, 'approve')}
                          >
                            Approve
                          </button>
                          <button
                            className="hotel-actionButton hotel-rejectButton"
                            onClick={() => handleStatusChange(hotel._id, 'reject')}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <button
                          className="hotel-actionButton hotel-deleteButton"
                          onClick={() => setDeleteHotelId(hotel._id)}
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

          {deleteHotelId && (
            <div>
              <div className="hotel-overlay" onClick={() => setDeleteHotelId(null)} />
              <div className="hotel-modal">
                <h2>Confirm Deletion</h2>
                <p className="hotel-confirmText">Are you sure you want to delete this hotel?</p>
                <div className="hotel-actionButtons">
                  <button onClick={() => handleDeleteHotel(deleteHotelId)} className="hotel-AmodalButton">Delete</button>
                  <button onClick={() => setDeleteHotelId(null)} className="hotel-CmodalButton">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHotelManagement;