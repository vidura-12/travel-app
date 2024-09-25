const Checklist = require('../models/Checklist');

// Create a new travel checklist
exports.createChecklist = async (req, res) => {
  const { title, category, items } = req.body;
  try {
    const checklist = new Checklist({
      userId: req.user.id, // Assuming `req.user.id` is set by the auth middleware
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
    const checklists = await Checklist.find({ userId: req.user.id });
    res.json(checklists);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get a specific travel checklist
exports.getChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id);
    if (!checklist || checklist.userId.toString() !== req.user.id) {
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
    if (!checklist || checklist.userId.toString() !== req.user.id) {
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
    if (!checklist || checklist.userId.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Checklist not found' });
    }
    await checklist.remove();
    res.json({ msg: 'Checklist deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
