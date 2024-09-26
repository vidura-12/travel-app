import React, { useState } from 'react';
import axios from 'axios';
//import './Checklist.css';

function CreateChecklist() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
    items: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:8081/api/checklists', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Checklist created!');
  };

  return (
    <div className="form-container">
      <h2>Create a New Travel Checklist</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Checklist Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="general">General</option>
          <option value="beach">Beach</option>
          <option value="hiking">Hiking</option>
          <option value="business">Business</option>
        </select>
        <button type="submit" className="button">Create Checklist</button>
      </form>
    </div>
  );
}

export default CreateChecklist;
