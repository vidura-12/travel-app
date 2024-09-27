import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Retrieve() {
    // State to hold the list of feedback data
    const [feedbackList, setFeedbackList] = useState([]);

     
    // Fetch feedback data from the backend when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/api/get-feedback')
            .then(response => {
                setFeedbackList(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the feedback!', error);
            });

         
    }, []);

    return (
        <div style={styles.container}>
            <h1>Feedback Received</h1>
            <ul style={styles.list}>
                {feedbackList.map((feedback, index) => (
                    <li key={index} style={styles.listItem}>
                        <h3>Name: {feedback.name}</h3>
                        <p>Email: {feedback.email}</p>
                        <p>Contact: {feedback.contact}</p>
                        <p>Category: {feedback.category}</p>
                        <p>Feedback: {feedback.feedback}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f8f8',
        minHeight: '100vh',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        backgroundColor: '#fff',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '5px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    }
};
