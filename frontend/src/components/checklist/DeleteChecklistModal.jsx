import React from 'react';
//import './delete-checklist-modal.css'; // Import the vanilla CSS file

function DeleteChecklistModal({ onClose, onDelete }) {
  return (
    <div className="fixed">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative transform hover:scale-105">
        <h2>Are you sure you want to delete this checklist?</h2>
        <div className="flex">
          {/* Cancel Button */}
          <button className="bg-gray-300 text-gray-700" onClick={onClose}>
            Cancel
          </button>
          
          {/* Delete Button */}
          <button className="bg-red-600 text-white" onClick={onDelete}>
            Delete
          </button>
        </div>
        <button className="absolute top-3 right-3 text-gray-500" onClick={onClose}>
          &#x2715; {/* Close icon (X) */}
        </button>
      </div>
    </div>
  );
}

export default DeleteChecklistModal;
