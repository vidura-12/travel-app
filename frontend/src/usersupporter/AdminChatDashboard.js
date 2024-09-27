import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminChatbox = () => {
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState('');
    const [selectedMessageId, setSelectedMessageId] = useState(null); // To keep track of the message being replied to
    const ADMIN_ID = 'admin'; // You can replace this with the actual admin identifier if it's different

    // Function to fetch messages from the server
    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/chat/messages'); // Adjust API endpoint as needed
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleReply = async (messageId) => {
        if (reply.trim()) {
            try {
                // Ensure you have the correct PUT endpoint for replying
                await axios.put(`http://localhost:8081/api/chat/messages/${messageId}`, {
                    response: reply
                });
                setReply(''); // Clear the reply input
                setSelectedMessageId(null); // Clear the selected message id
                fetchMessages(); // Fetch messages again to update the UI
            } catch (error) {
                console.error('Error replying to message:', error);
                // You might want to show a notification to the user here
            }
        }
    };

    return (
        <div
            style={{
                backgroundImage: 'url(/img/sl23.jpg)', // Replace with your image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                className="chat-window bg-light rounded shadow-lg"
                style={{
                    width: '600px', // Set width for the chat box
                    height: '800px', // Set height for the chat box
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                }}
            >
                <div
                    className="messages"
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#f8f9fa',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {messages.map((msg) => (
                        <div key={msg._id} style={{ marginBottom: '10px' }}>
                            <div
                                className={`p-2 rounded ${msg.userId === ADMIN_ID ? 'bg-secondary text-white' : 'bg-primary text-white'}`}
                                style={{
                                    display: 'inline-block',
                                    borderRadius: '20px',
                                    maxWidth: '75%',
                                }}
                            >
                                <strong>{msg.userId}:</strong> {msg.message}
                                {msg.response && (
                                    <div style={{ marginTop: '5px', fontStyle: 'italic' }}>
                                        <strong>Admin:</strong> {msg.response}
                                    </div>
                                )}
                            </div>
                            {msg.userId !== ADMIN_ID && !msg.response && ( // Show reply button only if there's no admin response
                                <button
                                    className="btn btn-link"
                                    onClick={() => {
                                        setSelectedMessageId(msg._id);
                                        setReply(''); // Clear previous reply
                                    }}
                                >
                                    Reply
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {selectedMessageId && (
                    <div className="input-group mt-3">
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            placeholder="Type your reply..."
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleReply(selectedMessageId)}
                        />
                        <button className="btn btn-primary rounded-pill" onClick={() => handleReply(selectedMessageId)}>
                            Send
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminChatbox;
