import React, { useState } from 'react';

const ApproveRegister = ({ seller, setSeller }) => {
  const [formData, setFormData] = useState({ ...seller });
  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable(!isEditable);  // Toggle edit mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setSeller(formData);  // Update seller details with the new data
    setIsEditable(false);  // Disable edit mode after saving
  };

  return (
    <div className="container mt-5">
      <h3>Approved Seller Details</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">Agency Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={handleEditClick}
        >
          {isEditable ? 'Cancel' : 'Edit'}
        </button>
        {isEditable && (
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default ApproveRegister;
