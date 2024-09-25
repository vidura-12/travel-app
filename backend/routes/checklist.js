const express = require('express');
const { createChecklist, getChecklist, updateChecklist, deleteChecklist, getAllChecklists } = require('../controllers/checklistController');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

// Create a new checklist
router.post('/', authMiddleware, createChecklist);

// Get all checklists for the logged-in user
router.get('/', authMiddleware, getAllChecklists);

// Get a specific checklist
router.get('/:id', authMiddleware, getChecklist);

// Update a checklist
router.put('/:id', authMiddleware, updateChecklist);

// Delete a checklist
router.delete('/:id', authMiddleware, deleteChecklist);

module.exports = router;
