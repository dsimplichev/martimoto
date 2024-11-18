import './nav.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import Register from '../register/Register';
import { useState } from 'react';
import Login from '../login/Login';
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";


function Nav() {
    const [showRegister, setShowRegister] = useState(false)
    const [showLogin, setShowLogin] = useState(false);

    const toggleForms = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    return (
        <div className="navbar">
            <div className="navbar-content">
            <img src={logo} alt="Logo" className="logo" />
                <ul className="nav-links">
                    <li><Link to="/">НАЧАЛО</Link></li>
                    <li><Link to="/model">ИЗБЕРИ МОДЕЛ</Link></li>
                    <li><Link to="/model">АКСЕСОАРИ</Link></li>
                    <li><Link to="/contact">КОНТАКТИ</Link></li>
                    <li><Link to="/about">ЗА НАС</Link></li>
                </ul>
                <div className="btn">
                        <>
                            <button className='user' onClick={() => setShowLogin(true)}> <FaUserCircle /> </button>
                            <button className='ShoppingCart' > <FaShoppingCart /> </button>  
                        </>                  
                </div>
            </div>
            {showRegister && <Register onClose={() => setShowRegister(false)} />}
            {showLogin && <Login onClose={() => setShowLogin(false)} onCreateAccountClick={toggleForms} />}
        </div>
    );
}

export default Nav;
