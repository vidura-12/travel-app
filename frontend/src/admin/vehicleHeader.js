import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; 
import Swal from 'sweetalert2';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out and redirected to the login page.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with logout
                localStorage.removeItem('token');
                localStorage.removeItem('email'); 
                sessionStorage.clear();  
                navigate('/admin/login');  
            }
        }); 
    };

    return (
        <div className="navbar-custom-header">
            <ul className="menu-header">
                <li className="menu-item-header">
                    <a className="nav-link-header" href="/LocationAdmin/home">DashBoard</a>
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