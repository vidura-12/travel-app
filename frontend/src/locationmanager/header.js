import React from 'react';
import './Header.css'; // Import the custom CSS file

const Header = () => {
    return (
        <ul className="nav nav-underline bg-light d-flex header-nav">
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/LocationAdmin/home">DashBoard</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/LocationAdmin/LocationsSummary">Reacts & Comments</a>
            </li>
            <li className="nav-item ml-auto">
                <a className="nav-link logout-link" href="/admin/login">Logout</a>
            </li>
        </ul>
    );
}

export default Header;
