import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaListAlt, FaClipboardList, FaHistory, FaCalendarAlt, FaPlus } from 'react-icons/fa'; // Importing icons
import styles from './Sidebar.module.css'; 

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Dashboard</h2>
      <ul className={styles.sidebarList}>
        <li>
          <Link to="/profile" className={styles.link}>
            <FaUser className={styles.icon} /> Profile
          </Link>
        </li>
        <li>
          <Link to="/checklists" className={styles.link}>
            <FaListAlt className={styles.icon} /> My Checklist
          </Link>
        </li>
        <li>
          <Link to="/create-checklist" className={styles.link}>
            <FaPlus className={styles.icon} /> Create Checklist
          </Link>
        </li>
        <li>
          <Link to="/booking" className={styles.link}>
            <FaClipboardList className={styles.icon} /> My Bookings
          </Link>
        </li>
        <li>
          <Link to="/reservation" className={styles.link}>
            <FaHistory className={styles.icon} /> Reservation History
          </Link>
        </li>
        <li>
          <Link to="/viewLocation" className={styles.link}>
            <FaClipboardList className={styles.icon} /> User Added Locations
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
