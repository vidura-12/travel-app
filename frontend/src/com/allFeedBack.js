import React, { useEffect, useState } from 'react';

const AllFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            const response = await fetch('/FeedBack/all');
            const data = await response.json();
            setFeedbacks(data);
        };

        fetchFeedbacks();
    }, []);

    return (
        <div style={styles.container}>
            <h1>All Feedback</h1>
            <div style={styles.box}>
                {feedbacks.length === 0 ? (
                    <p>No feedback available.</p>
                ) : (
                    feedbacks.map((feedback, index) => (
                        <div key={index} style={styles.feedback}>
                            <p><strong>Name:</strong> {feedback.name}</p>
                            <p><strong>Email:</strong> {feedback.email}</p>
                            <p><strong>Contact Number:</strong> {feedback.contact}</p>
                            <p><strong>Category:</strong> {feedback.category}</p>
                            <p><strong>Feedback:</strong> {feedback.feedback}</p>
                            <hr />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '50px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f8f8',
        minHeight: '100vh'
    },
    box: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto'
    },
    feedback: {
        marginBottom: '20px'
    }
};

export default AllFeedback;