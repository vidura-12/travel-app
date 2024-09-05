import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './Header.css'; // Import the custom CSS file

const Header = () => {
    const navigate = useNavigate(); // Use useNavigate to programmatically navigate

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        
        // Optionally, you might want to clear other session-related data
        // localStorage.removeItem('otherKey');

        // Redirect to login page
        navigate('/admin/login');
    };

    return (
        <ul className="navbar-custom">
            <li className="menu-item">
                <a className="nav-link" aria-current="page" href="/LocationAdmin/home">DashBoard</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/LocationAdmin/LocationsSummary">Reacts & Comments</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/LocationAdmin/profile">Profile</a>
            </li>
            <li className="nav-item ml-auto">
                <a className="nav-link logout-link" href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}><button>Logout</button></a>
            </li>
        </ul>
    );
}

export default Header;
