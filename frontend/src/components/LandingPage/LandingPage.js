// src/pages/LandingPage.js
import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LandingPageContent from '../LandingPageContent/LandingPageContent';
import Modal from '../Modal/Modal';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import './LandingPage.css';

const LandingPage = () => {
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);

    return (
        <div className="landing-page">
            <Header />
            <LandingPageContent />
            <Footer />
        </div>
    );
};

export default LandingPage;
