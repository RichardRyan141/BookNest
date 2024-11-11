import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = ({ onClose, onLoginClick }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        
        if (data.token) {
            console.log('Registration successful:', data);
            // Save the token to localStorage or context
            // You might redirect the user to the dashboard or login page here
        } else {
            console.log('Registration failed:', data.message);
        }
    };

    return (
        <div className="modal">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
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
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
                <p>
                    Already have an account? <span className="login-link"  onClick={onLoginClick}>Login here</span>
                </p>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default RegisterForm;
