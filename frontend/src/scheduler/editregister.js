import React, { useState, useEffect } from 'react';
import './Editregister.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Editregister = () => {
  const [approvedSellers, setApprovedSellers] = useState([]);

  useEffect(() => {
    const savedApproved = JSON.parse(localStorage.getItem('approvedSellers'));
    if (savedApproved) {
      setApprovedSellers(savedApproved);
    }
  }, []);

  return (
    <div className="editregister container mt-5">
      <center><h2 className="editre-title">Approved Seller Information</h2></center>
      <div className="row mt-4">
        {approvedSellers.length > 0 ? (
          approvedSellers.map((seller, index) => (
            <div key={index} className="col-md-4">
              <div className="card mb-4 seller-card">
                <div className="card-body">
                  <h5 className="card-title">{seller.name}</h5>
                  <p className="card-text"><strong>Email:</strong> {seller.email}</p>
                  <p className="card-text"><strong>Phone:</strong> {seller.phone}</p>
                  <p className="card-text"><strong>Address:</strong> {seller.address}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No approved seller data available.</p>
        )}
      </div>
    </div>
  );
};

export default Editregister;
