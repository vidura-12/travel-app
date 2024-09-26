const express = require('express');
const router = express.Router();
const UserMessage = require('../models/UserMessage'); // Adjust the path to your model file

// Route for user to send a message
router.post('/messages', async (req, res) => {
    const { userId, message } = req.body;

    // Save user message
    const userMessage = new UserMessage({ userId, message, status: 'waiting' });
    await userMessage.save();

    // Here you can add logic for the admin to reply
    const adminResponse = "Waiting for admin response"; // Placeholder response
    const adminMessage = new UserMessage({ userId: 'admin', message: adminResponse });
    await adminMessage.save();

    // Send the admin response back to the client
    res.status(200).json({ response: adminResponse });
});

// Route for user to get messages based on userId
router.get('/messages', async (req, res) => {
    const { userId } = req.query; // Get the userId from query

    try {
        // If userId is provided, filter messages
        const messages = userId ? await UserMessage.find({ userId }) : await UserMessage.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
});

// Route for admin to reply to a message based on userId
router.put('/messages', async (req, res) => {
    const { userId, response } = req.body; // Expecting userId in the request body

    try {
        // Find the latest message from the specified user
        const userMessage = await UserMessage.findOne({ userId, status: 'waiting' }).sort({ createdAt: -1 });

        if (!userMessage) {
            return res.status(404).json({ message: 'No waiting message found for this user' });
        }

        // Update the found message with the admin's response
        userMessage.response = response; // Assuming you want to add a response field to the existing message
        userMessage.status = 'answered'; // Update status to indicate it has been answered
        await userMessage.save(); // Save the updated message

        res.status(200).json({ message: 'Response updated successfully', data: userMessage });
    } catch (error) {
        res.status(500).json({ message: 'Error updating response', error });
    }
});

module.exports = router;
