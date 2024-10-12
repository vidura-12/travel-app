import React, { useState } from 'react';
import axios from 'axios'; 
import Sidebar from './Sidebar'; 
import styles from './ChecklistForm.module.css'; 

const ChecklistForm = () => {
  const [title, setTitle] = useState(''); 
  const [category, setCategory] = useState('general'); 
  const [items, setItems] = useState([{ name: '', priority: 'medium' }]);
  const [successMessage, setSuccessMessage] = useState(''); 

  
  const handleAddItem = () => {
    setItems([...items, { name: '', priority: 'medium' }]);
  };

  
  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  
  const handleInputChange = (index, event) => {
    const newItems = [...items];
    newItems[index][event.target.name] = event.target.value;
    setItems(newItems);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    const formData = {
      title, 
      category, 
      items, 
    };
  
    const token = localStorage.getItem('token');
  
    try {
     
      const response = await axios.post('http://localhost:8081/api/checklists', formData, {
        headers: { Authorization: `Bearer ${token}` }, // Send token in Authorization header
      });
  
      
      alert('Checklist created!');
      console.log('Checklist created:', response.data);
    } catch (error) {
      
      console.error('Error creating checklist:', error.response.data);
      alert('Failed to create checklist.');
    }
  };
  
  

  return (
    <div className={styles.container}>
      <Sidebar /> 
      <div className={styles.formContainer}>
        <h2>Create a New Checklist</h2>
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          {/* Checklist Title */}
          <div className={styles.inputGroup}>
            <label htmlFor="title">Checklist Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter checklist title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className={styles.inputGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="beach">Beach</option>
              <option value="hiking">Hiking</option>
              <option value="business">Business</option>
              <option value="general">General</option>
            </select>
          </div>

          {/* Checklist Items */}
          <h3>Items</h3>
          {items.map((item, index) => (
            <div key={index} className={styles.itemGroup}>
              <input
                type="text"
                name="name"
                placeholder="Item name"
                value={item.name}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
              <select
                name="priority"
                value={item.priority}
                onChange={(e) => handleInputChange(index, e)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button type="button" onClick={() => handleRemoveItem(index)}>
                Remove
              </button>
            </div>
          ))}

          {/* Buttons */}
          <button type="button" onClick={handleAddItem} className={styles.addItem}>
            + Add Item
          </button>
          <button type="submit" className={styles.submitBtn}>
            Create Checklist
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChecklistForm;
