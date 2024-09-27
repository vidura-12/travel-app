const mongoose = require('mongoose');

const ChecklistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['beach', 'hiking', 'business', 'general'], 
    default: 'general'
  },
  items: [
    {
      name: { type: String, required: true },
      priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
      notes: String,
      completed: { type: Boolean, default: false }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Checklist', ChecklistSchema);
