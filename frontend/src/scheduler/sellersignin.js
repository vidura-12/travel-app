import React, { useState } from 'react';

const SellerSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('packageSeller'); // Default role

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log({ email, password, role });
  };

  return (
    <div style={styles.container}>
      <h2>Seller Sign In</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
            <option value="packageSeller">Package Seller</option>
            <option value="eventOrganizer">Event Organizer</option>
            <option value="vehicleOwner">Vehicle Owner</option>
            <option value="hotelOwner">Hotel Owner</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Sign In</button>
      </form>
    </div>
  );
};

// Simple styles for the component
const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default SellerSignIn;
