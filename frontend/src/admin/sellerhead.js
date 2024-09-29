import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header4.css'; 

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div className="navbar-custom-header">
            <ul className="menu-header">
                <li className="menu-item-header">
                    <a className="nav-link-header" href="/scheduler/approvedPackages">View approved Packages</a>
                </li>
                <li className="menu-item-header">
                    <a className="nav-link-header" href="/agency">Add Packages</a>
                </li>
            </ul>
            <div className="profile-header">
                <button className="nav-link-profile-header" onClick={() => navigate('/Admin/profile')}>Profile</button>
                <button className="nav-link-profile-logout-header" onClick={handleLogout}>LogOut</button>
            </div>
        </div>
    );
}

export default Header;
