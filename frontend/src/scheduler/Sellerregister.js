import React, { useState, useEffect } from 'react';
import './Sellerregister.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sellerregister = () => {
  const [sellersData, setSellersData] = useState([]);

  useEffect(() => {
    // Retrieve sellers data from localStorage
    const savedData = JSON.parse(localStorage.getItem('sellersData'));
    if (savedData) {
      setSellersData(savedData);
    }
  }, []);

  const handleApprove = (index) => {
    alert('Seller registration approved!');
    // Remove approved seller from the list
    const updatedSellers = sellersData.filter((_, i) => i !== index);
    setSellersData(updatedSellers);
    localStorage.setItem('sellersData', JSON.stringify(updatedSellers));
  };

  const handleDeny = (index) => {
    alert('Seller registration denied!');
    // Remove denied seller from the list
    const updatedSellers = sellersData.filter((_, i) => i !== index);
    setSellersData(updatedSellers);
    localStorage.setItem('sellersData', JSON.stringify(updatedSellers));
  };

  return (
    <div className='sellerregister'>
      <div className="container mt-5">
        <h2 className="selre">Registered Seller Information</h2>
        {sellersData.length > 0 ? (
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>Agency Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellersData.map((seller, index) => (
                <tr key={index}>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>{seller.phone}</td>
                  <td>{seller.address}</td>
                  <td>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleApprove(index)}
                    >
                      Approve
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeny(index)}>
                      Deny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No seller data available. Please register sellers first.</p>
        )}
      </div>
    </div>
  );
};

export default Sellerregister;
