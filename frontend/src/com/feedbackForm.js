import React, { useState } from 'react';

export default function FeedbackForm() {
    // State to hold form data and error messages
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        category: 'hotel service',
        feedback: ''
    });
    const [errors, setErrors] = useState({});

    // Handler to update form data when inputs change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validation function
    const validate = () => {
        const newErrors = {};

        // Name validation: only letters allowed
        if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = 'Name must contain only letters';
        }

        // Email validation: must follow a valid email format
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is not valid';
        }

        // Contact validation: must be exactly 10 digits and numeric
        if (!/^\d{10}$/.test(formData.contact)) {
            newErrors.contact = 'Contact number must be exactly 10 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handler to submit form data
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Feedback Submitted:', formData);
            // You can send formData to your backend server here
        } else {
            console.log('Validation failed');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <header style={styles.header}>
                    <h1>Feedback Form</h1>
                </header>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                        {errors.name && <span style={styles.error}>{errors.name}</span>}
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                        {errors.email && <span style={styles.error}>{errors.email}</span>}
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Contact Number:</label>
                        <input
                            type="tel"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                        {errors.contact && <span style={styles.error}>{errors.contact}</span>}
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Feedback Category:</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            style={styles.select}
                            required
                        >
                            <option value="Hotel service">Hotel Service</option>
                            <option value="Transport service">Transport Service</option>
                            <option value="Tour guide service">Tour guide Service</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Feedback:</label>
                        <textarea
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleChange}
                            style={styles.textarea}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.button}>Submit Feedback</button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f8f8',
        minHeight: '100vh',
        marginTop: '100px'
    },
    box: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        width: '100%',
        maxWidth: '600px',
        textAlign: 'center'
    },
    header: {
        marginBottom: '20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left'
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold'
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    },
    select: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    },
    textarea: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        height: '100px'
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: '#fff',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        alignSelf: 'flex-start'
    },
    error: {
        color: 'red',
        marginTop: '5px'
    }
};
