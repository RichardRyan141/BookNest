import React, { useState, useEffect } from 'react';
import './Header.css';
import Modal from '../Modal/Modal'; // Import Modal component
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

    // Check if the user is logged in (if token exists in localStorage)
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Set state based on token existence
    }, []);

    const openLoginForm = () => {
        setShowLogin(true);
        setShowRegister(false);
    };

    const openRegisterForm = () => {
        setShowRegister(true);
        setShowLogin(false);
    };

    const closeForm = () => {
        setShowLogin(false);
        setShowRegister(false);
    };

    const logout = async () => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            console.log('No token found');
            return;
        }
    
        // Decode the JWT to extract userId (you can use a library like jwt-decode)
        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.id;  // Assuming your token has an `id` field for userId
    
        if (!userId) {
            console.log('User ID not found in token');
            return;
        }
    
        // Call the backend logout API
        await fetch('http://localhost:5000/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }), // Send userId in request body
        });
    
        // Remove token from localStorage and update state
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        console.log('Logged out successfully');
    };
    

    return (
        <header className="header">
            <div className="readNav">
                <div className="logo">
                    <h1>
                        <a href="/" className="littleLogo">BookNest</a>
                    </h1>
                </div>
                <nav className="navigation">
                    {isAuthenticated ? (
                        <button onClick={logout} className="logout-button">
                            Logout
                        </button>
                    ) : (
                        <button onClick={openLoginForm} className="login-button">
                            Login
                        </button>
                    )}
                </nav>
            </div>

            {/* Using the Modal component to display forms */}
            <Modal isOpen={showLogin} onClose={closeForm}>
                <LoginForm onClose={closeForm} onRegisterClick={openRegisterForm} onLoginSuccess={() => setIsAuthenticated(true)} />
            </Modal>

            <Modal isOpen={showRegister} onClose={closeForm}>
                <RegisterForm onClose={closeForm} onLoginClick={openLoginForm} />
            </Modal>
        </header>
    );
};

export default Header;
