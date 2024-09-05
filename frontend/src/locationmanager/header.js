import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div className="navbar-custom">
            <ul className="menu">
                <li className="menu-item">
                    <a className="nav-link" href="/LocationAdmin/home">DashBoard</a>
                </li>
                <li className="menu-item">
                    <a className="nav-link" href="/LocationAdmin/LocationsSummary">Reacts & Comments</a>
                </li>
            </ul>
            <div className="profile">
                <button className="nav-link-profile" onClick={() => navigate('/LocationAdmin/profile')}>Profile</button>
                <button className="nav-link-profile-logout" onClick={handleLogout}>LogOut</button>
            </div>
        </div>
    );
}

export default Header;
