import './nav.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import Register from '../register/Register';
import { useState } from 'react';


function Nav() {
    const [showRegister, setShowRegister] = useState(false)

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
                            <button className='login' >Login</button>
                        </>                  
                </div>
            </div>
            {showRegister && <Register onClose={() => setShowRegister(false)} />}
        </div>
    );
}

export default Nav;
