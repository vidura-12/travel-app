import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sellerssignup.css'

const Sellersignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic
    console.log(formData);
  };

  return (
    <div className='signup'>
    <div className="container" style={{ transparent: 'true' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4"><b>Seller Signup</b></h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="name">Travel Agency Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your agency name" // Hint text
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email" // Hint text
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password" // Hint text
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success w-100 mb-3"
                    style={{ maxWidth: '200px' }}
                  >
                    Sign Up
                  </button>
                </div>
                <p className="text-center">Already have an account?</p>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    style={{ maxWidth: '300px' }}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Sellersignup;
