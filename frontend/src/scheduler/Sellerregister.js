import React, { useState, useEffect } from 'react';
import './Sellerregister.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sellerregister = () => {
  const [sellersData, setSellersData] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('sellersData'));
    if (savedData) {
      setSellersData(savedData);
    }
  }, []);

  const handleApprove = (index) => {
    alert('Seller registration approved!');
    const updatedSellers = sellersData.map((seller, i) =>
      i === index ? { ...seller, status: 'Approved' } : seller
    );

    setSellersData(updatedSellers);
    localStorage.setItem('sellersData', JSON.stringify(updatedSellers));
  };

  const handleDeny = (index) => {
    alert('Seller registration denied!');
    const updatedSellers = sellersData.filter((_, i) => i !== index);
    setSellersData(updatedSellers);
    localStorage.setItem('sellersData', JSON.stringify(updatedSellers));
  };

  return (
    <div className='sellerregister'>
      
      <div className="container mt-5">
        <center>
          <div className='re'>
          <h2 className="selre">Registered Seller Information</h2>
          </div>
        </center>
        {sellersData.length > 0 ? (
          <table className="table table-bordered mt-4">
            <thead className='sellertable'>
              <tr>
                <th>Agency Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Status</th>
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
                    {seller.status ? (
                      <span className="badge bg-success">{seller.status}</span>
                    ) : (
                      <span className="badge bg-warning">Pending</span>
                    )}
                  </td>
                  <td>
                    {!seller.status && (
                      <button
                        className="location-btn-approve"
                        onClick={() => handleApprove(index)}
                      >
                        Approve
                      </button>
                    )}
                    <button className="location-btn-delete" onClick={() => handleDeny(index)}>
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
