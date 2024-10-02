import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebar from './Sidebar'; // Import Sidebar component
import styles from './ChecklistItem.module.css';

const ChecklistItem = () => {
  const { checklistId, checklistTitle } = useParams();  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/checklists/${checklistId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setItems(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching checklist items:', error);
        setError('Failed to load checklist items.');
        setLoading(false);
      }
    };

    fetchItems();
  }, [checklistId]);

  // Calculate progress
  useEffect(() => {
    if (items.length > 0) {
      const completedItems = items.filter((item) => item.completed).length;
      const progressPercentage = (completedItems / items.length) * 100;
      setProgress(progressPercentage);
    }
  }, [items]);

  const handleToggleComplete = async (itemId, completed) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/checklists/${checklistId}/items/${itemId}`, // Fixed URL
        { completed: !completed },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      const updatedItem = response.data;

      // Log response to check if the correct item is returned
      console.log('Updated item:', updatedItem);

      // Update the state with the new item data
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === updatedItem._id ? { ...item, completed: updatedItem.completed } : item
        )
      );
    } catch (error) {
      console.error('Error updating item:', error.response ? error.response.data : error.message);
      setError('Failed to update item.');
    }
  };

  if (loading) {
    return <p>Loading checklist items...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <Sidebar />

      {/* Checklist Content */}
      <div className={styles.checklistItemContainer}>
        <h2 className={styles.checklistTitle}>{checklistTitle}</h2>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
        </div>
        <p className={styles.progressText}>{progress.toFixed(0)}% Completed</p>

        {/* Checklist Items */}
        <ul className={styles.itemList}>
          {items.map((item) => (
            <li key={item._id} className={styles.item}>
              <div className={styles.itemLeft}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggleComplete(item._id, item.completed)}
                  className={styles.itemCheckbox}
                />
                <span className={`${styles.itemName} ${item.completed ? styles.completedItem : ''}`}>
                  {item.name}
                </span>
              </div>
              <div className={`${styles.priority} ${styles[item.priority]}`}>
                <span className={styles.priorityText}>
                  {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChecklistItem;
