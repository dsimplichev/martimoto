import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';
import { FavoritesContext } from '../../Context/FavoritesContext';
import { FaUserCircle, FaShoppingCart, FaHeart, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import logo from '../../assets/logo.png';
import Register from '../register/Register';
import Login from '../login/Login';
import axios from 'axios';


function Nav({ onLogout }) {
    const { isLoggedIn, user, logout, setUser } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const [showLogin, setShowLogin] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const profileDropdownRef = useRef(null);
    const cartDropdownRef = useRef(null);
    const { favorites } = useContext(FavoritesContext);
    const totalFavorites = favorites ? favorites.length : 0;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        onLogout?.();
    };

    useEffect(() => {
        if (isLoggedIn) {
            axios.get('http://localhost:5000/auth/user', { withCredentials: true })
                .then(response => {
                    setUser(response.data.user);
                })
                .catch(error => {
                    console.log('Грешка при заявка към /user:', error);
                });
        }
    }, [setUser, isLoggedIn]);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
            if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
                setShowCartDropdown(false);
            }
        };

        if (showProfileDropdown || showCartDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showProfileDropdown, showCartDropdown]);

    const handleCartClick = () => {
        setShowCartDropdown(prev => !prev);
        setShowProfileDropdown(false); // Close profile dropdown if open
    };

    const navigateToCart = () => {
        setShowCartDropdown(false); // Close cart dropdown if open
        navigate('/cart'); // Navigate to the cart page
    };

    return (
        <div className="navbar">
            <div className="navbar-content">
                <img src={logo} alt="Logo" className="logo" />
                <div className="hamburger" onClick={() => setIsMobileMenuOpen(prev => !prev)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`nav-links ${isMobileMenuOpen ? "show" : ""}`}>
                    <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>НАЧАЛО</Link></li>
                    <li><Link to="/model" onClick={() => setIsMobileMenuOpen(false)}>ИЗБЕРИ МОДЕЛ</Link></li>
                    <li><Link to="/accessories" onClick={() => setIsMobileMenuOpen(false)}>АКСЕСОАРИ</Link></li>
                    <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>КОНТАКТИ</Link></li>
                    <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>ЗА НАС</Link></li>
                </ul>
                <div className="btn">
                    {isLoggedIn ? (
                        <>
                            <div className="profile-section" ref={profileDropdownRef}>
                                <span className="profile-header" onClick={() => { setShowProfileDropdown(prev => !prev); setShowCartDropdown(false); }}>
                                    Моят профил <FaChevronDown className="chevron-down" />
                                </span>
                                <p className="greeting">Здравейте</p>
                                <p className="username">{user?.displayName && user.displayName.trim() !== ""
                                    ? user.displayName
                                    : user?.username || "Гост"}</p>
                                {showProfileDropdown && (
                                    <div className="dropdown-menu show">
                                        <ul>
                                            <li><Link to="/order-history" onClick={() => setShowProfileDropdown(false)}>История на поръчките</Link></li>
                                            <li><Link to="/favorites" onClick={() => setShowProfileDropdown(false)}>Желани продукти</Link></li>
                                            <li><Link to="/profile/password" onClick={() => setShowProfileDropdown(false)}>Парола</Link></li>
                                            {user?.role === 'admin' && (
                                                <>
                                                    <li><Link to="/add-part" onClick={() => setShowProfileDropdown(false)}>Добави част</Link></li>
                                                    <li><Link to="/add-accessory" onClick={() => setShowProfileDropdown(false)}>Добави аксесоари</Link></li>
                                                    <li><Link to="/admin/orders" onClick={() => setShowProfileDropdown(false)}>Поръчки за изпращане</Link></li>
                                                    <li><Link to="/admin/messages" onClick={() => setShowProfileDropdown(false)}>Съобщения</Link></li>
                                                </>
                                            )}
                                            <li><button className="logout-btn" onClick={() => { handleLogout(); setShowProfileDropdown(false); }}>Изход</button></li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <button className='FaHeart'>
                                <Link to="/favorites" className="heart-link">
                                    <FaHeart />
                                    {totalFavorites > 0 && (
                                        <span className="heart-badge">{totalFavorites}</span>
                                    )}
                                </Link>
                            </button>
                        </>
                    ) : (
                        <button className='user' onClick={() => setShowLogin(true)}>
                            <FaUserCircle />
                        </button>
                    )}

                    <div className="cart-section" ref={cartDropdownRef}>
                        {/* 🆕 Променена логика на onClick: */}
                        <button
                            className="ShoppingCart2"
                            onClick={isLoggedIn ? navigateToCart : handleCartClick}
                        >
                            <FaShoppingCart />
                            {totalItems > 0 && (
                                <span className="cart-badge">{totalItems}</span>
                            )}
                        </button>
                        {/* 🆕 Дропдаунът се показва само когато потребителят НЕ Е логнат И showCartDropdown е true */}
                        {!isLoggedIn && showCartDropdown && (
                            <div className="dropdown-menu show cart-dropdown">
                                {totalItems === 0 ? (
                                    <p className="empty-cart-message">Количката е празна.</p>
                                ) : (
                                    <>
                                        <p className="cart-summary">Продукти в количката: {totalItems}</p>
                                        <button className="view-cart-btn" onClick={navigateToCart}>Виж количката</button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
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