import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onClose, onRegisterClick, onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.token) {
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token); // Save the token to localStorage
            onLoginSuccess(); // Trigger success callback
            onClose(); // Close the login modal
        } else {
            console.log('Login failed:', data.message);
        }
    };

    return (
        <div className="modal">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
                <p>
                    Don’t have an account? <span className="register-link" onClick={onRegisterClick}>Register here</span>
                </p>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default LoginForm;
