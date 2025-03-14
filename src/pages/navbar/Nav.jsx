import { useState, useEffect, useContext } from 'react';
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
                            <div className="profile-section">
                                <span className="profile-header" onClick={() => setShowDropdown(prev => !prev)}>
                                    Моят профил <FaChevronDown className="chevron-down" />
                                </span>
                                <p className="greeting">Здравейте</p>
                                <p className="username">{user?.username}</p>
                                {showDropdown && (
                                    <div className="dropdown-menu show">
                                        <ul>
                                            <li><Link to="/profile">Моят профил</Link></li>
                                            <li><Link to="/order-history">История на поръчките</Link></li>
                                            {user?.role === 'admin' && (
                                                <>
                                                    <li><Link to="/add-part">Добави част</Link></li>
                                                    <li><Link to="/add-accessory">Добави аксесоари</Link></li>
                                                    <li><Link to="/admin/orders">Поръчки за изпращане</Link></li>
                                                </>
                                            )}
                                            <li><button className="logout-btn" onClick={handleLogout}>Изход</button></li>
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
                    
                    
                    <button className="ShoppingCart">
                        <Link to='/cart'>
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