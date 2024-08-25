import React, { useState, useEffect } from 'react';
import './book.css';

export default function BookTourists() {
  const [tourists, setTourists] = useState([]);

  // Fetch data from your database (this is just a placeholder function)
  useEffect(() => {
    // Replace with your actual data fetching logic
    const fetchTourists = async () => {
      const data = [
        {
          name: 'John Doe',
          email: 'john@example.com',
          address: '123 Main St',
          contact: '123-456-7890',
          languages: 'English, Spanish',
        },
        // Add more tourist data here
      ];
      setTourists(data);
    };

    fetchTourists();
  }, []);

  return (
 
   <div> 
    
    <div 
      style={{
        backgroundImage: "url('/img/dash.jpg')",   
        backgroundSize: 'cover',                  
        backgroundPosition: 'center',              
        backgroundRepeat: 'no-repeat',             
        height: '100vh',                          
        width: '100%',                            
        display: 'flex',                           
        alignItems: 'center',                      
        justifyContent: 'center'                  
      }}
    >
        <div className="form-container">
        
        <h2>Book Tourists</h2>
        <table className="form-table">
          <thead>
            <tr>
              <th>Tourist's Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>Languages</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tourists.map((tourist, index) => (
              <tr key={index}>
                <td>{tourist.name}</td>
                <td>{tourist.email}</td>
                <td>{tourist.address}</td>
                <td>{tourist.contact}</td>
                <td>{tourist.languages}</td>
                <td>
                  <div className="button-container">
                    <button type="button" className="approve-button">Approve</button>
                    <button type="button" className="deny-button">Deny</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></div>  
    </div>
  );
}
