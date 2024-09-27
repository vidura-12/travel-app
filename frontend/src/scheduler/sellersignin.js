import React, { useState } from 'react';
import './sellersignin.css'

const SellerSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('packageSeller'); // Default role

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log({ email, password, role });
  };

  return (
    <div className='sel'>
    <div className='seller'>
    <div className="container mt-5">
      <center>
      <h2>Sign In</h2>
      </center>
      </div>
      <div className='sellercon'>
        <center>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      
        <button type="submit" className="btn btn-success">Sign In</button>
      </form>
      </center>
    </div>
    </div>
    </div>
  );
};

export default SellerSignIn;
