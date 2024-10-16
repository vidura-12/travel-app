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
                localStorage.removeItem('vehicleOwner');
                sessionStorage.clear();  
                navigate('/vehicle-owner/login');  // Redirect to the login page
            }
          });  
      };

    return (
        <div className="navbar-custom-header">
            <ul className="menu-header">
                <li className="menu-item-header">
                    <a className="nav-link-header" href="/vehicle-owner-dashboard">DashBoard</a>
                </li>
            </ul>
            <div className="profile-header">
                <button className="nav-link-profile-header" onClick={() => navigate('/Vehicle-Owner/mybookings')}>My Bookings</button>
                <button className="nav-link-profile-header" onClick={() => navigate('/Vehicle-Owner/profile')}>Profile</button>
                <button className="nav-link-profile-logout-header" onClick={handleLogout}>LogOut</button>
            </div>
        </div>
    );
}

export default Header;
