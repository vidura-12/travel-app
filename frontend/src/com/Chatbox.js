import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [canSendMessage, setCanSendMessage] = useState(true);
    const [loading, setLoading] = useState(true); // State to manage loading status

    const userEmail = localStorage.getItem('email') || 'User';

    const fetchMessages = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get(`http://localhost:8081/api/chat/messages?userId=${userEmail}`);
            setMessages(response.data);

            const userMessage = response.data.find(msg => msg.userId === userEmail && msg.status === 'waiting');
            setCanSendMessage(!userMessage);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleSendMessage = async () => {
        if (input.trim() && canSendMessage) {
            const userMessage = { text: input, from: userEmail };
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setInput('');

            try {
                setLoading(true); // Start loading
                const response = await axios.post('http://localhost:8081/api/chat/messages', {
                    userId: userEmail,
                    message: input
                });

                const assistantMessage = {
                    text: response.data.response,
                    from: 'Admin'
                };

                setMessages(prevMessages => [...prevMessages, assistantMessage]);
                setCanSendMessage(false);
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                setLoading(false); // End loading
            }
        }
    };

    return (
        <div style={{
            backgroundImage: 'url(/img/sl57.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div className="chat-window bg-light rounded shadow-lg" style={{
                width: '100%',
                maxWidth: '500px',
                height: '700px',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
            }}>
                <div className="messages" style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}>
                    {loading ? (
                        <div className="text-center">Loading messages...</div>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} style={{ marginBottom: '10px', textAlign: msg.from === userEmail ? 'right' : 'left' }}>
                                <div className={`p-2 rounded position-relative ${msg.from === userEmail ? 'bg-primary text-white' : 'bg-secondary text-white'}`}
                                    style={{
                                        display: 'inline-block',
                                        borderRadius: '20px',
                                        maxWidth: '75%',
                                        marginLeft: msg.from === userEmail ? 'auto' : '0',
                                        marginRight: msg.from === userEmail ? '0' : 'auto',
                                        marginTop: '5px',
                                    }}>
                                    {msg.text}
                                    <span className={`position-absolute ${msg.from === userEmail ? 'end-0' : 'start-0'}`}
                                        style={{
                                            width: '10px',
                                            height: '10px',
                                            backgroundColor: msg.from === userEmail ? '#007bff' : '#6c757d',
                                            borderRadius: '50%',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                        }} />
                                </div>
                            </div>
                        ))
                    )}
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
                    <button className="btn btn-primary rounded-pill" onClick={handleSendMessage} disabled={!canSendMessage || loading}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
