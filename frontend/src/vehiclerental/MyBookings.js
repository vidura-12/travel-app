import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    margin: '20px 0',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '0 auto',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  thead: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  th: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  },
  trEven: {
    backgroundColor: '#f2f2f2',
  },
  trOdd: {
    backgroundColor: '#fff',
  },
  noBookings: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '16px',
    color: '#555',
  },
};

function VehicleOwner() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  //const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const user = localStorage.getItem('token');
  useEffect(() => {
    //const user = JSON.parse(localStorage.getItem('vehicleOwner'));
    if (user && user.email) {
      setEmail(user.email);
      fetchBookings(user.email);
    } else {
      navigate('/vehicle-owner/login');
    }
  }, [navigate]);

  const token = localStorage.getItem('token');
  const fetchBookings = async (email) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/bookings/owner', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setBookings(response.data.data);
    } catch (err) {
      setError(`Failed to fetch bookings: ${err.response?.data?.message || err.message}`);
    }
  };
  
  return (
    <div>
      <Header />
      <div className='content'>
      <div style={styles.title}>My Bookings</div>
      {error && <p style={styles.error}>{error}</p>}
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Vehicle</th>
            <th style={styles.th}>Booked By</th>
            <th style={styles.th}>Start Date</th>
            <th style={styles.th}>End Date</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={booking._id} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
                <td style={styles.td}>{booking.vehicleId.make} {booking.vehicleId.model}</td>
                <td style={styles.td}>{booking.userName}</td>
                <td style={styles.td}>{new Date(booking.startDate).toLocaleDateString()}</td>
                <td style={styles.td}>{new Date(booking.returnDate).toLocaleDateString()}</td>
                <td style={styles.td}>LKR {booking.totalCost}</td>
                <td style={styles.td}>{booking.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={styles.noBookings}>No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default VehicleOwner;
