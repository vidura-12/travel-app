import React, { useState } from 'react';
//import './checklist-items.css'; // Import the vanilla CSS file

function ChecklistItems({ items, updateItems }) {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (!newItem.trim()) return; // Avoid empty items
    const updatedItems = [...items, { name: newItem, priority: 'medium', completed: false }];
    updateItems(updatedItems);
    setNewItem(''); // Clear input after adding
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((item, i) => i !== index);
    updateItems(updatedItems);
  };

  return (
    <div className="flex">
      <div className="max-w-lg bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h2>Checklist Items</h2>

        {/* Checklist Items List */}
        <ul className="space-y-4">
          {items.length === 0 ? (
            <li className="text-center text-gray-600">No items yet. Add your first item!</li>
          ) : (
            items.map((item, index) => (
              <li
                key={index}
                className="flex p-3 bg-gray-50 rounded-lg shadow transition-colors hover:bg-gray-100"
              >
                <div>
                  <p className="text-gray-700">{item.name}</p>
                  <p className="text-gray-500">Priority: {item.priority}</p>
                </div>
                <button
                  onClick={() => deleteItem(index)}
                  className="text-red-600 transition-colors hover:text-red-800"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Input for Adding New Item */}
        <div className="flex space-x-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
          />
          <button onClick={addItem}>Add Item</button>
        </div>
      </div>
    </div>
  );
}

export default ChecklistItems;
