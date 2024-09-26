import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChecklistOverview() {
  const [checklists, setChecklists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
    items: [{ name: '', priority: 'medium', notes: '', completed: false }],
  });

  useEffect(() => {
    const fetchChecklists = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8081/api/checklists', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChecklists(response.data);
    };
    fetchChecklists();
  }, []);

  // Toggle the modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Add another item
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', priority: 'medium', notes: '', completed: false }],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/checklists', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Checklist created!');
    setShowModal(false);
    setFormData({ title: '', category: 'general', items: [{ name: '', priority: 'medium', notes: '', completed: false }] });
    // Fetch the updated checklist after creation
    const response = await axios.get('http://localhost:5000/api/checklists', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setChecklists(response.data);
  };

  return (
    <div className="checklist-container">
      <h1 className="heading">Your Travel Checklists</h1>
      
      {/* Checklist Cards */}
      <div className="checklist-grid">
        {checklists.length === 0 ? (
          <p className="empty-message">You have no checklists yet. Start planning your trip!</p>
        ) : (
          checklists.map((checklist) => (
            <div key={checklist._id} className="checklist-card">
              <h2 className="checklist-title">{checklist.title}</h2>
              <p className="checklist-category">Category: {checklist.category}</p>
              <p className="checklist-items">{checklist.items.length} items</p>
              <button className="view-button">View Checklist</button>
            </div>
          ))
        )}
      </div>

      {/* Create New Checklist Button */}
      <button className="create-button" onClick={toggleModal}>+ Create New Checklist</button>

      {/* Modal for Creating New Checklist */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create a New Travel Checklist</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                type="text"
                name="title"
                placeholder="Checklist Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="modal-input"
              />
              <select
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="modal-input"
              >
                <option value="general">General</option>
                <option value="beach">Beach</option>
                <option value="hiking">Hiking</option>
                <option value="business">Business</option>
              </select>

              <div className="items-section">
                {formData.items.map((item, index) => (
                  <div key={index} className="collapsible-item">
                    <h4>Item {index + 1}</h4>
                    <input
                      type="text"
                      name="name"
                      placeholder="Item Name"
                      value={item.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          items: formData.items.map((itm, i) =>
                            i === index ? { ...itm, name: e.target.value } : itm
                          ),
                        })
                      }
                      required
                      className="modal-input"
                    />
                    <select
                      name="priority"
                      value={item.priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          items: formData.items.map((itm, i) =>
                            i === index ? { ...itm, priority: e.target.value } : itm
                          ),
                        })
                      }
                      className="modal-input"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <textarea
                      name="notes"
                      placeholder="Notes"
                      value={item.notes}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          items: formData.items.map((itm, i) =>
                            i === index ? { ...itm, notes: e.target.value } : itm
                          ),
                        })
                      }
                      className="modal-input"
                    />
                  </div>
                ))}
              </div>

              <div className="button-container">
                <button type="button" className="add-item-button" onClick={addItem}>
                  + Add Another Item
                </button>
                <button type="submit" className="modal-button">Create Checklist</button>
              </div>
            </form>
            <button className="close-button" onClick={toggleModal}>&#x2715;</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChecklistOverview;
