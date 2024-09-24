import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, from: 'user' }]);
            setInput('');
            // Simulate a response from the assistant
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "This is a response from the assistant.", from: 'assistant' }
                ]);
            }, 1000);
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
                alignItems: 'center', // Center vertically
            }}
        >
            <div
                className="chat-window bg-light rounded shadow-lg" // Added shadow-lg for a professional look
                style={{
                    width: '500px', // Set width for the chat box
                    height: '700px', // Set height for the chat box
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
                        border: '1px solid #ccc', // Border for better visibility
                        borderRadius: '8px',
                        backgroundColor: '#f8f9fa',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Added shadow for depth
                    }}
                >
                    {messages.map((msg, index) => (
                        <div key={index} style={{ marginBottom: '10px', textAlign: msg.from === 'user' ? 'right' : 'left' }}>
                            <div
                                className={`p-2 rounded position-relative ${msg.from === 'user' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}
                                style={{
                                    display: 'inline-block',
                                    borderRadius: '20px',
                                    maxWidth: '75%', // Limit the width of the message bubble
                                    marginLeft: msg.from === 'user' ? 'auto' : '0',
                                    marginRight: msg.from === 'user' ? '0' : 'auto',
                                    marginTop: '5px',
                                }}
                            >
                                {msg.text}
                                <span
                                    className={`position-absolute ${msg.from === 'user' ? 'end-0' : 'start-0'}`}
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: msg.from === 'user' ? '#007bff' : '#6c757d',
                                        borderRadius: '50%',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="input-group mt-3">
                    <input
                        type="text"
                        className="form-control rounded-pill"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button className="btn btn-primary rounded-pill" onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
