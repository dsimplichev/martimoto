import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';
import { FavoritesContext } from '../../Context/FavoritesContext';
import { FaUserCircle, FaShoppingCart, FaHeart, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './nav.css';
import martimoto10 from '../../assets/martimoto10.png';
import Login from '../login/Login';
import { HashLink } from 'react-router-hash-link';

function Nav({ onLogout }) {
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const { favorites } = useContext(FavoritesContext);

    const [showLogin, setShowLogin] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const profileDropdownRef = useRef(null);
    const cartDropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const isCartPage = location.pathname === '/cart';

    const totalFavorites = favorites ? favorites.length : 0;
    const EUR_EXCHANGE_RATE = 1.95583;

    const handleLogout = () => {
        logout();
        onLogout?.();
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalBGN = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalEUR = (totalBGN / EUR_EXCHANGE_RATE).toFixed(2);

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
        setShowProfileDropdown(false);
    };

    const navigateToCart = () => {
        setShowCartDropdown(false);
        navigate('/cart');
    };

    return (
        <div className="navbar">
            <div className="navbar-content">
                <img src={martimoto10} alt="Logo" className="logo" />
                <div className="hamburger" onClick={() => setIsMobileMenuOpen(prev => !prev)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`nav-links ${isMobileMenuOpen ? "show" : ""}`}>
                    <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>НАЧАЛО</Link></li>
                    <li><Link to="/model" onClick={() => setIsMobileMenuOpen(false)}>MOTO МОДЕЛИ</Link></li>
                    <li><Link to="/accessories" onClick={() => setIsMobileMenuOpen(false)}>МОТО АКСЕСОАРИ</Link></li>
                    <li><Link to="/autosviat" onClick={() => setIsMobileMenuOpen(false)}>Авто Аксесоари</Link></li>
                    <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>КОНТАКТИ</Link></li>
                    <li><HashLink smooth to="#about-section" onClick={() => setIsMobileMenuOpen(false)}>ЗА НАС</HashLink></li>
                </ul>

                <div className="btn">
                    {isLoggedIn ? (
                        <>
                            <div className="profile-section" ref={profileDropdownRef}>
                                <span className="profile-header" onClick={() => { setShowProfileDropdown(prev => !prev); setShowCartDropdown(false); }}>
                                    Моят профил <FaChevronDown className="chevron-down" />
                                </span>
                                <p className="greeting">Здравейте</p>
                                <p className="username">
                                    {user?.displayName && user.displayName.trim() !== ""
                                        ? user.displayName
                                        : user?.username || "Гост"}
                                </p>
                                {showProfileDropdown && (
                                    <div className="dropdown-menu show">
                                        <ul>
                                            <li><Link to="/order-history" onClick={() => setShowProfileDropdown(false)}>История на поръчките</Link></li>
                                            <li><Link to="/favorites" onClick={() => setShowProfileDropdown(false)}>Желани продукти</Link></li>
                                            {user?.role === 'admin' && (
                                                <>
                                                    <li><Link to="/add-part" onClick={() => setShowProfileDropdown(false)}>Добави част</Link></li>
                                                    <li><Link to="/add-car-tires" onClick={() => setShowProfileDropdown(false)}>Добави авто гуми</Link></li>
                                                    <li><Link to="/add-oil" onClick={() => setShowProfileDropdown(false)}>Добави масло</Link></li>
                                                    <li><Link to="/add-accessory" onClick={() => setShowProfileDropdown(false)}>Добави аксесоари</Link></li>
                                                    <li><Link to="/add-wiper-fluid" onClick={() => setShowProfileDropdown(false)}>Добави течност за чистачки</Link></li>
                                                    <li><Link to="/add-mats" onClick={() => setShowProfileDropdown(false)}>Добави стелки</Link></li>
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
                        <button
                            className="ShoppingCart2"
                            onClick={() => {
                                if (isCartPage) {
                                    setShowCartDropdown(false);
                                } else {
                                    handleCartClick(); 
                                }
                            }}
                        >
                            <FaShoppingCart />
                            {totalItems > 0 && (
                                <span className="cart-badge">{totalItems}</span>
                            )}
                        </button>

                        {showCartDropdown && (
                            <div className="dropdown-menu show cart-dropdown">
                                {totalItems === 0 ? (
                                    <p className="empty-cart-message">Количката е празна.</p>
                                ) : (
                                    <>
                                        <div className="cart-items-list">
                                            {cart.map(item => (
                                                <div key={item._id} className="cart-dropdown-item">
                                                    <img src={item.image} alt={item.title} className="cart-dropdown-item-image" />
                                                    <div className="cart-dropdown-item-info">
                                                        <span className="cart-dropdown-item-title">{item.title}</span>
                                                        <span className="cart-dropdown-item-price-qty">
                                                            {item.quantity} x {item.price.toFixed(2)} лв. ({(item.price / EUR_EXCHANGE_RATE).toFixed(2)} €)
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="cart-dropdown-total">
                                            Общо: {totalBGN.toFixed(2)} лв. ({totalEUR} €)
                                        </div>
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