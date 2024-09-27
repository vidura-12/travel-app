import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token from localStorage and sessionStorage
        localStorage.removeItem('token');
        sessionStorage.clear(); // Clear session storage

        // Optionally, make an API call to inform the backend that the user has logged out
        // Example:
        // fetch('/api/logout', {
        //   method: 'POST',
        //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        // })

        navigate('/admin/login'); // Redirect to login
    };

    return (
        <div className="navbar-custom-header">
            <ul className="menu-header">
                <li className="menu-item-header">
                    <a className="nav-link-header" href="/vehicle-manager-dashboard">DashBoard</a>
                </li>
            </ul>
            <div className="profile-header">
                <button className="nav-link-profile-header" onClick={() => navigate('/Vehicle-Admin/profile')}>Profile</button>
                <button className="nav-link-profile-logout-header" onClick={handleLogout}>LogOut</button>
            </div>
        </div>
    );
}

export default Header;
