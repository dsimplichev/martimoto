import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { FaUserCircle, FaShoppingCart, FaHeart, FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './nav.css';
import logo from '../../assets/logo.png';
import Register from '../register/Register';
import Login from '../login/Login';

function Nav({ onLogout }) {
    const { isLoggedIn, user, logout, setUser } = useContext(AuthContext);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [cart, setCart] = useState([]); 

    const toggleForms = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    const toggleDropdown = () => setShowDropdown(prev => !prev);

    const toggleCartDropdown = () => setShowCartDropdown(prev => !prev); 

    const handleLogout = () => {
        logout();
        onLogout?.();
    };

   
    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    useEffect(() => {
        if (isLoggedIn)
            axios.get('http://localhost:5000/user/user', { withCredentials: true })
                .then(response => {
                    console.log(response); 
                    setUser(response.data.user);
                })
                .catch(error => {
                    console.log('Грешка при заявка към /user:', error);
                });
    }, [setUser, isLoggedIn]);

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
                                <span className="profile-header" onClick={toggleDropdown}>
                                    Моят профил <FaChevronDown className="chevron-down" />
                                </span>
                                <p className="greeting">Здравейте</p>
                                <p className="username">{user?.username}</p>
                                {showDropdown && (
                                    <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                                        <ul>
                                            <li><Link to="/profile">Моят профил</Link></li>
                                            <li><Link to="/order-history">История на поръчките</Link></li>
                                            {user?.role === 'admin' && (
                                                <>
                                                    <li><Link to="/add-part">Добави част</Link></li>
                                                    <li><Link to="/add-accessory">Добави аксесоари</Link></li>
                                                    <li><Link to="/delivery-order">Поръчки за изпращане</Link></li>
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
                        <>
                            <button className='user' onClick={() => setShowLogin(true)}>
                                <FaUserCircle />
                            </button>
                        </>
                    )}

                    <button className="ShoppingCart" onClick={toggleCartDropdown}>
                        <FaShoppingCart />
                        {cart.length > 0 && (  
                            <span className="cart-badge">{cart.length}</span>
                        )}
                    </button>

                    {showCartDropdown && (
                        <div className="cart-dropdown show">
                            {cart.length > 0 ? (  
                                <ul>
                                    {cart.map((product, index) => (
                                        <li key={index}>
                                            <img src={product.mainImage} alt={product.name} className="cart-item-img" />
                                            <span>{product.name}</span>
                                            <span>{product.price} лв</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className='cart-order'>Кошницата ви е празна!</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="info-bar">
                <p className="info-text">
                    МартиМото ви пожелава весело и незабравимо изкарване на Коледните и Новогодишни празници!
                </p>
            </div>

            {showRegister && <Register onClose={() => setShowRegister(false)} />}
            {showLogin && <Login onClose={() => setShowLogin(false)} onCreateAccountClick={toggleForms} />}
        </div>
    );
}

export default Nav;