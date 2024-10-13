const Checklist = require('../models/Checklist');

// Create a new travel checklist
exports.createChecklist = async (req, res) => {
  const { title, category, items } = req.body;
  try {
    const checklist = new Checklist({
      userId: req.user.userId, // Assuming `req.user.id` is set by the auth middleware
      title,
      category,
      items
    });
    await checklist.save();
    res.status(201).json(checklist);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all checklists for the logged-in user
exports.getAllChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.find({ userId: req.user.userId });
    res.json(checklists);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get a specific travel checklist
exports.getChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id);
    if (!checklist || checklist.userId.toString() !== req.user.userId) {
      return res.status(404).json({ msg: 'Checklist not found' });
    }
    res.json(checklist);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a travel checklist
exports.updateChecklist = async (req, res) => {
  const { title, category, items } = req.body;
  try {
    let checklist = await Checklist.findById(req.params.id);
    if (!checklist || checklist.userId.toString() !== req.user.userId) {
      return res.status(404).json({ msg: 'Checklist not found' });
    }
    checklist.title = title || checklist.title;
    checklist.category = category || checklist.category;
    checklist.items = items || checklist.items;
    checklist.updatedAt = Date.now();

    await checklist.save();
    res.json(checklist);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a travel checklist
exports.deleteChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id);

    if (!checklist || checklist.userId.toString() !== req.user.userId) {
      return res.status(404).json({ msg: 'Checklist not found' });
    }
    // Use deleteOne to remove the checklist
    await Checklist.deleteOne({ _id: req.params.id });
    // Respond with a success message
    res.json({ msg: 'Checklist deleted successfully' });
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateChecklistItem = async (req, res) => {
  const { checklistId, itemId } = req.params;
  const { completed } = req.body; // Assuming you're only updating the 'completed' status for now

  try {
    // Find the checklist by ID
    let checklist = await Checklist.findById(checklistId);
    
    // Check if checklist exists and belongs to the logged-in user
    if (!checklist || checklist.userId.toString() !== req.user.userId) {
      return res.status(404).json({ msg: 'Checklist not found or unauthorized' });
    }

    // Find the item within the checklist's items array
    const item = checklist.items.id(itemId); // Mongoose's subdocument method to get the item

    // Check if item exists
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    // Update the completed status
    item.completed = completed !== undefined ? completed : item.completed;
    
    // Optionally, you can update other fields if needed
    // item.name = req.body.name || item.name;
    // item.priority = req.body.priority || item.priority;

    // Save the parent checklist document with the updated item
    checklist.updatedAt = Date.now(); // Update the timestamp
    await checklist.save();

    // Respond with the updated item
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};


