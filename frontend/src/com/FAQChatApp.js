import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FAQChatApp = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [isUseful, setIsUseful] = useState(false);
    const [showResponseInput, setShowResponseInput] = useState(false);
    const [response, setResponse] = useState('');
    const [feedbackGiven, setFeedbackGiven] = useState(false);
    const [additionalInput, setAdditionalInput] = useState('');
    const [redirectToContact, setRedirectToContact] = useState(false);

    const answers = {
        1: "You can book transportation by selecting your preferred vehicle type (car, bus, or van).Visit Vehicle Rental page.",
        2: "Yes, we offer professional tour guides for various destinations.Visit Travel agents page.",
        3: "To schedule a hotel booking, go to the 'Hotels' section.",
        4: "Absolutely! We can help plan and organize events like corporate meetings.Visit Events page.",
        5: "To check or modify your booking, log in to your account and visit the 'Travel Packages'.",
        6: "Yes, we offer location services that can help you discover popular attractions.Search for Featured Locations",
        7: "You can easily cancel your booking by going to 'My Bookings' and selecting 'Cancel'.",
        8: "Our customer support is available 24/7. You can reach us via chat, email, or call us at +94 110 45 2569.",
        9: "We offer discounts for group bookings! Contact our sales team or check our 'Special Offers' page.",
        10: "To reschedule your booking, log in to your account, go to 'My Bookings', and select 'Reschedule'.",
        11: "Yes, we offer airport pickup and drop-off services.",
        12: "You can view all past bookings in the 'My Bookings' section.",
        13: "Please contact our support team at +94 110 45 2569 or send an e mail to travelmate@gmail.com "
    };

    const questions = [
        { id: 1, question: "How do I book transportation?" },
        { id: 2, question: "Do you offer tour guides?" },
        { id: 3, question: "How do I schedule a hotel booking?" },
        { id: 4, question: "Can you help plan events?" },
        { id: 5, question: "How can I check or modify my booking?" },
        { id: 6, question: "Do you provide location services?" },
        { id: 7, question: "How do I cancel my booking?" },
        { id: 8, question: "How can I contact customer support?" },
        { id: 9, question: "Do you offer discounts for group bookings?" },
        { id: 10, question: "How can I reschedule my booking?" },
        { id: 11, question: "Do you offer airport pickup services?" },
        { id: 12, question: "How can I view my past bookings?" },
        { id: 13, question: "Other" }
    ];

    const handleQuestionSelect = (question) => {
        setSelectedQuestion(question);
        setChatHistory([...chatHistory, { type: 'user', message: question.question }]);
        setTimeout(() => {
            setChatHistory([...chatHistory, { type: 'user', message: question.question }, { type: 'system', message: answers[question.id] }]);
            setTimeout(() => {
                setChatHistory((prevHistory) => [
                    ...prevHistory,
                    { type: 'system', message: 'Is this reply useful?' }
                ]);
                setShowResponseInput(true);
            }, 500);
        }, 1000); // Simulating a delay for system response
    };

    const handleResponseSubmit = () => {
        setChatHistory([...chatHistory, { type: 'user', message: response }]);

        if (response.toLowerCase() === 'yes') {
            setTimeout(() => {
                setChatHistory([...chatHistory, { type: 'user', message: response }, { type: 'system', message: "Thank you! If you have any more questions, feel free to ask." }]);
                setShowResponseInput(false);
                setFeedbackGiven(true);
            }, 500);
        } else if (response.toLowerCase() === 'no') {
            setTimeout(() => {
                setChatHistory([...chatHistory, { type: 'user', message: response }, { type: 'system', message: "If you need further assistance, please contact our support team at +94 110 45 2569." }]);
                setShowResponseInput(false);
                setFeedbackGiven(true);
            }, 500);
        }
    };

    // Adding greeting message on component load
    useEffect(() => {
        setChatHistory([{ type: 'system', message: 'Hello! How can I assist you today? Please select a question below.' }]);
    }, []);

    useEffect(() => {
        if (feedbackGiven && additionalInput) {
            window.location.href = "/ContactUs";
        }
    }, [additionalInput, feedbackGiven]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: 'url("/img/sl57.jpg")', backgroundSize: 'cover' }}>
            <div className="container mt-3" style={{ maxWidth: '600px',maxHeight: '800px', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '15px', boxShadow: '0 0 10px rgba(0,0,0,0.8)', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
                <h4 className="text-center mb-4">Chatbox</h4>
                <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                    {chatHistory.map((chat, index) => (
                        <div key={index} className={`d-flex ${chat.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                            <div style={{
                                backgroundColor: chat.type === 'user' ? '#006400' : '#343a40',
                                color: '#ffffff',
                                padding: '10px 15px',
                                borderRadius: '15px',
                                margin: '5px 0',
                                maxWidth: '75%',
                                wordWrap: 'break-word',
                                textAlign: chat.type === 'user' ? 'right' : 'left'
                            }}>
                                {chat.message}
                            </div>
                        </div>
                    ))}
                </div>

                {!selectedQuestion && (
                    <div className="form-group mt-3">
                        <label htmlFor="questionSelect">Select a question:</label>
                        <select className="form-control" id="questionSelect" onChange={(e) => handleQuestionSelect(questions.find(q => q.id === parseInt(e.target.value)))}>
                            <option value="">--Choose a question--</option>
                            {questions.map(q => (
                                <option key={q.id} value={q.id}>{q.question}</option>
                            ))}
                        </select>
                    </div>
                )}

                {showResponseInput && (
                    <div className="mt-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type 'yes' or 'no'"
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && response) {
                                    handleResponseSubmit();
                                }
                            }}
                        />
                    </div>
                )}

                {feedbackGiven && (
                    <div className="mt-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type something here to contact us"
                            value={additionalInput}
                            onChange={(e) => setAdditionalInput(e.target.value)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQChatApp;
