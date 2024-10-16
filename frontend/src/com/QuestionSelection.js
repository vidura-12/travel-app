import React from 'react';

const questions = [
    { id: 1, question: "How can I book a transportation service?" },
    { id: 2, question: "Can I get a tour guide for my trip?" },
    { id: 3, question: "How do I schedule my hotel bookings?" },
    { id: 4, question: "Can you help me organize an event?" },
    { id: 5, question: "How can I check or modify my booking?" },
    { id: 6, question: "Do you offer location services to help me find attractions?" }
];

const QuestionSelection = ({ setSelectedQuestion }) => {
    return (
        <div>
            {questions.map((q) => (
                <button 
                    key={q.id} 
                    onClick={() => setSelectedQuestion(q)}
                    style={{ display: 'block', margin: '10px 0' }}
                >
                    {q.question}
                </button>
            ))}
        </div>
    );
};

export default QuestionSelection;
