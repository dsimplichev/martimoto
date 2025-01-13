import './nav.css';
import { Link } from 'react-router-dom';
import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import logo from '../../assets/logo.png';
import Register from '../register/Register';
import Login from '../login/Login';
import { FaUserCircle, FaShoppingCart, FaHeart, FaChevronDown } from "react-icons/fa";

function Nav({ onLogout }) {
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Продукт 1", img: "path/to/image1.jpg", price: "20 лв." },
        { id: 2, name: "Продукт 2", img: "path/to/image2.jpg", price: "30 лв." }
    ]);

    const toggleForms = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    const toggleCart = () => setShowCart(prev => !prev);

    const toggleDropdown = useCallback(() => {
        console.log('Dropdown clicked');
        setShowDropdown(prev => !prev);
    }, []);

    const removeItemFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const handleLogout = () => {
        logout();
        onLogout?.();
    };

    console.log('isLoggedIn:', isLoggedIn);
    console.log('user:', user);

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
                                <p className="username">{user && user.email ? user.email : 'Няма име'}</p>
                                {showDropdown && (
                                    <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                                        <ul>
                                            <li><Link to="/profile">Моят профил</Link></li>
                                            <li><Link to="/order-history">История на поръчките</Link></li>
                                            <li><button className="logout-btn" onClick={handleLogout}>Изход</button></li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <button className="FaHeart">
                                <Link to="/favorites">
                                    <FaHeart />
                                </Link>
                            </button>
                        </>
                    ) : (
                        <button className="user" onClick={() => setShowLogin(true)}>
                            <FaUserCircle />
                        </button>
                    )}

                    <button className="ShoppingCart" onClick={toggleCart}>
                        <FaShoppingCart />
                    </button>
                </div>
            </div>

            <div className="info-bar">
                <p className="info-text">
                    МартиМото ви пожелава весело и незабравимо изкарване на Коледните и Новогодишни празници!
                </p>
            </div>

            {showCart && (
                <div className={`cart-dropdown ${showCart ? 'show' : ''}`}>
                    {cartItems.length === 0 ? (
                        <p>Количката е празна</p>
                    ) : (
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <img src={item.img} alt={item.name} className="cart-item-img" />
                                    <div className="cart-item-info">
                                        <p>{item.name}</p>
                                        <p>{item.price}</p>
                                    </div>
                                    <button
                                        className="remove-item"
                                        onClick={() => removeItemFromCart(item.id)}
                                    >
                                        X
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {showRegister && <Register onClose={() => setShowRegister(false)} />}
            {showLogin && <Login onClose={() => setShowLogin(false)} onCreateAccountClick={toggleForms} />}
        </div>
    );
}

export default Nav;
