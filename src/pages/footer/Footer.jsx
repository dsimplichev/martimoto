import "./footer.css"
import logo from '../../assets/logo.png'

import { FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <img src={logo} alt="Logo" className="footer-logo" />
                <div className="social-icons">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img  alt="Instagram" />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={<FaInstagram />} alt="Facebook" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;