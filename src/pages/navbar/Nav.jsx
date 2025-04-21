import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext'; 
import { FaUserCircle, FaShoppingCart, FaHeart, FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './nav.css';
import logo from '../../assets/logo.png';
import Register from '../register/Register';
import Login from '../login/Login';
import axios from 'axios';

function Nav({ onLogout }) {
    const { isLoggedIn, user, logout, setUser } = useContext(AuthContext);
    const { cart } = useContext(CartContext); 
    const [showLogin, setShowLogin] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null); 

    const handleLogout = () => {
        logout();
        onLogout?.();
    };

    useEffect(() => {
        if (isLoggedIn)
            axios.get('http://localhost:5000/user/user', { withCredentials: true })
                .then(response => {
                    setUser(response.data.user);
                })
                .catch(error => {
                    console.log('Грешка при заявка към /user:', error);
                });
    }, [setUser, isLoggedIn]);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <div className="navbar">
            <div className="navbar-content">
                <img src={logo} alt="Logo" className="logo" />
                <ul className="nav-links">
                    <li><Link to="/">НАЧАЛО</Link></li>
                    <li><Link to="/model">ИЗБЕРИ МОДЕЛ</Link></li>
                    <li><Link to="/accessories">АКСЕСОАРИ</Link></li>
                    <li><Link to="/contact">КОНТАКТИ</Link></li>
                    <li><Link to="/about">ЗА НАС</Link></li>
                </ul>
                <div className="btn">
                    {isLoggedIn ? (
                        <>
                            <div className="profile-section" ref={dropdownRef}>
                                <span className="profile-header" onClick={() => setShowDropdown(prev => !prev)}>
                                    Моят профил <FaChevronDown className="chevron-down" />
                                </span>
                                <p className="greeting">Здравейте</p>
                                <p className="username">{user?.username}</p>
                                {showDropdown && (
                                    <div className="dropdown-menu show">
                                        <ul>
                                            <li><Link to="/profile" onClick={() => setShowDropdown(false)}>Моят профил</Link></li>
                                            <li><Link to="/order-history" onClick={() => setShowDropdown(false)}>История на поръчките</Link></li>
                                            {user?.role === 'admin' && (
                                                <>
                                                    <li><Link to="/add-part" onClick={() => setShowDropdown(false)}>Добави част</Link></li>
                                                    <li><Link to="/add-accessory" onClick={() => setShowDropdown(false)}>Добави аксесоари</Link></li>
                                                    <li><Link to="/admin/orders" onClick={() => setShowDropdown(false)}>Поръчки за изпращане</Link></li>
                                                    <li><Link to="/admin/messages" onClick={() => setShowDropdown(false)}>Съобщения</Link></li>
                                                </>
                                            )}
                                            <li><button className="logout-btn" onClick={() => { handleLogout(); setShowDropdown(false); }}>Изход</button></li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <button className='FaHeart'>
                                <Link to="/favorites">
                                    <FaHeart />
                                </Link>
                            </button>
                        </>
                    ) : (
                        <button className='user' onClick={() => setShowLogin(true)}>
                            <FaUserCircle />
                        </button>
                    )}
                    
                    <button className="ShoppingCart2">
                        <Link className='cart2' to='/cart'>
                            <FaShoppingCart />
                            {totalItems > 0 && (  
                                <span className="cart-badge">{totalItems}</span>
                            )}
                        </Link>
                    </button>

                </div>
            </div>

            <div className="info-bar">
                <p className="info-text">
                    МартиМото ви пожелава весело и незабравимо изкарване на Коледните и Новогодишни празници!
                </p>
            </div>

            {showLogin && <Login onClose={() => setShowLogin(false)} />}
        </div>
    );
}

export default Nav;