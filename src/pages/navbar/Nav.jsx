import './nav.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import Register from '../register/Register';
import { useState } from 'react';
import Login from '../login/Login';


function Nav() {
    const [showRegister, setShowRegister] = useState(false)
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="navbar">
            <div className="navbar-content">
            <img src={logo} alt="Logo" className="logo" />
                <ul className="nav-links">
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/model">SELECTION MODEL</Link></li>
                    <li><Link to="/contact">CONTACT</Link></li>
                    <li><Link to="/about">ABOUT</Link></li>
                </ul>
                <div className="btn">
                        <>
                            <button className='sign_up' onClick={() => setShowRegister(true)} >Sign up</button>
                            <button className='login' onClick={() => setShowLogin(true)}>Login</button>
                        </>                  
                </div>
            </div>
            {showRegister && <Register onClose={() => setShowRegister(false)} />}
            {showLogin && <Login onClose={() => setShowLogin(false)} />}
        </div>
    );
}

export default Nav;
