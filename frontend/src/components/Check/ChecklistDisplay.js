import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For table in PDF
import Sidebar from './Sidebar';
import styles from './ChecklistDisplay.module.css';

const ChecklistDisplay = () => {
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // New state for selected category
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingChecklist, setEditingChecklist] = useState(null);

  // Fetch checklists from the backend
  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/checklists', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setChecklists(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching checklists:', error);
        setLoading(false);
      }
    };

    fetchChecklists();
  }, []);

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth(); // Get the width of the page
    const imageWidth = 30; // The width of the image you want to add
    const margin = 10; // The margin from the right edge

    // Calculate the X position for the right corner
    const xPosition = pageWidth - imageWidth - margin;

    // Add title
  doc.setFontSize(16);
  doc.text('Checklist Report', 105, 20, { align: 'center' });
  doc.rect(5, 5, 200, 285);
  doc.addImage('/ll.jpg', 'PNG', 160, 10, 30, 30);
  
    doc.autoTable({
      startY: 50,
      head: [['Title', 'Items Count']],
      body: checklists.map((checklist) => [
        checklist.title,
        checklist.items.length,
      ]),
    });

      // Calculate the Y position for the signature section based on the table height
  const finalY = doc.lastAutoTable.finalY || 60; // Get the position after the table ends

  // Add "Signature" label below the table
  doc.setFontSize(12);
  doc.text('Signature:', 10, finalY + 20); // Position the text slightly below the table

  // Add signature image under the "Signature" label
  doc.addImage('/sig.jpg', 'PNG', 10, finalY + 25, 50, 20);

    doc.save('Checklist_Report.pdf');
  };

  // Handle opening the edit modal
  const handleEditClick = (checklist) => {
    setEditingChecklist(checklist);
    setEditModalOpen(true);
  };

  // Handle updating the checklist data
  const handleUpdateChecklist = (e) => {
    const { name, value } = e.target;
    setEditingChecklist((prevChecklist) => ({
      ...prevChecklist,
      [name]: value,
    }));
  };

  // Handle saving changes
  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:5000/api/checklists/${editingChecklist._id}`, editingChecklist, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setChecklists((prevChecklists) =>
        prevChecklists.map((checklist) =>
          checklist._id === editingChecklist._id ? editingChecklist : checklist
        )
      );
      setEditModalOpen(false); // Close the modal after saving changes
    } catch (error) {
      console.error('Error updating checklist:', error);
    }
  };

  const handleDeleteClick = async (checklistId) => {
    if (window.confirm('Are you sure you want to delete this checklist?')) {
      try {
        await axios.delete(`http://localhost:5000/api/checklists/${checklistId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        // Remove the deleted checklist from state
        setChecklists((prevChecklists) =>
          prevChecklists.filter((checklist) => checklist._id !== checklistId)
        );
      } catch (error) {
        console.error('Error deleting checklist:', error);
      }
    }
  };

  // Search and category filter logic
  const filteredChecklists = checklists.filter((checklist) => {
    const matchesSearchTerm = checklist.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || checklist.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  if (loading) {
    return <p>Loading checklists...</p>;
  }

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.checklistContainer}>
        <h2>My Checklists</h2>

        {/* Search bar, Category Filter, and Report Button */}
        <div className={styles.searchCategoryReportContainer}>
          <input
            type="text"
            placeholder="Search checklists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.categorySelect}
          >
            <option value="">All Categories</option>
            <option value="beach">Beach</option>
            <option value="hiking">Hiking</option>
            <option value="business">Business</option>
            <option value="general">General</option>
          </select>

          <button onClick={generatePDF} className={styles.pdfButton}>
            Generate PDF Report
          </button>
        </div>

        {/* Checklist display */}
        <ul className={styles.checklistList}>
          {filteredChecklists.map((checklist) => (
            <li key={checklist._id} className={styles.checklistItem}>
              <div className={styles.checklistContent}>
                <div>
                  <h3>{checklist.title}</h3>
                  <p>{checklist.items.length} items</p>
                </div>
                <div className={styles.buttonGroup}>
                  <Link
                    to={`/checklists/${checklist._id}/${checklist.title}`}
                    className={styles.viewBtn}
                  >
                    View
                  </Link>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEditClick(checklist)}
                  >
                    Edit
                  </button>
                  <button className={styles.deleteBtn} onClick={() => handleDeleteClick(checklist._id)} >Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Edit Checklist</h3>

            {/* Checklist Title */}
            <div className={styles.inputGroup}>
              <label htmlFor="title">Checklist Title</label>
              <input
                type="text"
                name="title"
                value={editingChecklist.title}
                onChange={handleUpdateChecklist}
                className={styles.modalInput}
              />
            </div>

            {/* Category */}
            <div className={styles.inputGroup}>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                value={editingChecklist.category}
                onChange={handleUpdateChecklist}
                className={styles.modalInput}
              >
                <option value="beach">Beach</option>
                <option value="hiking">Hiking</option>
                <option value="business">Business</option>
                <option value="general">General</option>
              </select>
            </div>

            {/* Items */}
            <h3>Items</h3>
            {editingChecklist.items.map((item, index) => (
              <div key={index} className={styles.itemGroup}>
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) => {
                    const newItems = [...editingChecklist.items];
                    newItems[index].name = e.target.value;
                    setEditingChecklist((prevChecklist) => ({
                      ...prevChecklist,
                      items: newItems,
                    }));
                  }}
                  className={styles.modalInput}
                />
                <select
                  name="priority"
                  value={item.priority}
                  onChange={(e) => {
                    const newItems = [...editingChecklist.items];
                    newItems[index].priority = e.target.value;
                    setEditingChecklist((prevChecklist) => ({
                      ...prevChecklist,
                      items: newItems,
                    }));
                  }}
                  className={styles.modalInput}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            ))}

            {/* Save and Cancel Buttons */}
            <div className={styles.buttonContainer}>
              <button onClick={handleSaveChanges} className={styles.saveBtn}>
                Save Changes
              </button>
              <button onClick={() => setEditModalOpen(false)} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistDisplay;
