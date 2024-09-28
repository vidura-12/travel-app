import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './approvedPackages.css'; // Import the CSS file

const SellerPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('email');
  
    if (email) {
      axios.get(`http://localhost:8081/packages/sellerlog/${email}`)
        .then((response) => {
          setPackages(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch packages');
          setLoading(false);
        });
    } else {
      setError('No email found in localStorage');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="body65">
        <div className="seller-packages77">
      <h2 className='h2'>Approved Packages</h2>
      {packages.length === 0 ? (
        <p className="no-packages">No approved packages available.</p>
      ) : (
        <table className="packages-table">
          <thead>
            <tr>
              <th>Agency Name</th>
              <th>Phone Number</th>
              <th>Location</th>
              <th>Places</th>
              <th>Max People</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg._id}>
                <td>{pkg.agencyName}</td>
                <td>{pkg.phoneNumber}</td>
                <td>{pkg.location}</td>
                <td>{pkg.places.join(', ')}</td>
                <td>{pkg.maxPeople}</td>
                <td>${pkg.price}</td>
                <td>
                  <img src={`/img/${pkg.image}`} alt={pkg.agencyName} className="package-image" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
    
  );
};

export default SellerPackages;
