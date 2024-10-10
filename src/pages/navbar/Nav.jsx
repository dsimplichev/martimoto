import './nav.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'


function Nav() {
    

    return (
        <div className="navbar">
            <div className="navbar-content">
            <img src={logo} alt="Logo" className="logo" />
                <ul className="nav-links">
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/recipes">SELECTION MODEL</Link></li>
                    <li><Link to="/add-recipes">CONTACT</Link></li>
                    <li><Link to="/news">ABOUT</Link></li>
                </ul>
                <div className="btn">
                        <>
                            <button className='sign_up' >Sign up</button>
                            <button className='login' >Login</button>
                        </>                  
                </div>
            </div>
        </div>
    );
}

export default Nav;
