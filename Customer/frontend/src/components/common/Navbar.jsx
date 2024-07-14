import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

function Navbar() {
    const { isAuthenticated, isAdmin, handleLogout } = useContext(AuthContext);

    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">Company</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAuthenticated && isAdmin && <li><Link to="/admin/user-management">Customer Management</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;
