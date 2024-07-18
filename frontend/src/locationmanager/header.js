import React from 'react';

const Header = () => {
    return (
        <ul className="nav nav-underline bg-light d-flex justify-content-end"> {/* Added d-flex and justify-content-end for right alignment */}
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/Location/home">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/admin/login" style={{ marginLeft: 'auto' }}>Logout</a> {/* Inline style for moving to right */}
            </li>
        </ul>
    );
}

export default Header;
