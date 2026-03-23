import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link2, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">
                    <Link2 size={24} color="var(--primary)" />
                    <span>Shortify Pro</span>
                </Link>
            </div>
            <div className="nav-links">
                {user ? (
                    <>
                        <span className="user-email">
                            <UserIcon size={16} /> {user.email}
                        </span>
                        <button onClick={handleLogout} className="logout-btn">
                            <LogOut size={16} /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup" className="nav-cta">Get Started</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
