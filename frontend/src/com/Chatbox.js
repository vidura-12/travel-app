import React from 'react';

const Chatbox = ({ selectedQuestion, answer }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', width: '400px' }}>
            {selectedQuestion ? (
                <>
                    <p><strong>Question:</strong> {selectedQuestion.question}</p>
                    <p><strong>Answer:</strong> {answer}</p>
                </>
            ) : (
                <p>Please select a question to see the answer</p>
            )}
        </div>
    );
};

export default Chatbox;
