import React from 'react';
import './footer.css';
import logo from '../../assets/logo.png';
import { FaInstagram, FaFacebook, FaEnvelope, FaPhone } from 'react-icons/fa'; // Импортиране на допълнителни икони

function Footer() {
    return (
        <div>
            <footer className="footer">
                <div className="footer-content">
                    <img src={logo} alt="Logo" className="footer-logo" />
                    <div className="social-icons">
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="social-icon" />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="social-icon" />
                        </a>
                        <a href="mailto:info@example.com">
                            <FaEnvelope className="social-icon" /> 
                        </a>
                        <a href="tel:+123456789">
                            <FaPhone className="social-icon" /> 
                        </a>
                    </div>
                </div>
            </footer>
            
            
            <div className="privacy-policy-container">
                <p>© {new Date().getFullYear()} MARTIMOTO. All rights reserved. <a href="/privacy-policy">Privacy Policy</a></p>
            </div>
        </div>
    );
}

export default Footer;