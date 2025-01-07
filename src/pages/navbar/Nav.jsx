import './nav.css';
import { Link } from 'react-router-dom';
import { useState, useContext} from 'react';
import logo from '../../assets/logo.png';
import Register from '../register/Register';
import Login from '../login/Login';
import { AuthContext } from '../../Context/AuthContext'
import { FaUserCircle, FaShoppingCart, FaSignOutAlt, FaHeart } from "react-icons/fa";

function Nav() {
    const { isLoggedIn, user, login, logout } = useContext(AuthContext);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showCart, setShowCart] = useState(false); 
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Продукт 1", img: "path/to/image1.jpg", price: "20 лв." },
        { id: 2, name: "Продукт 2", img: "path/to/image2.jpg", price: "30 лв." }
    ]);

    const toggleForms = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    const toggleCart = () => {
        setShowCart((prev) => !prev);
    };

    const removeItemFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

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
                        <button className='FaHeart'>
                            <Link to="/favorites">
                                <FaHeart /> 
                            </Link>
                        </button>
                        <button className='FaSignOutAlt' onClick={logout}>
                            <FaSignOutAlt /> 
                        </button>
                    
                    </>
                ) : (
                    <>
                        <button className='user' onClick={() => setShowLogin(true)}> 
                            <FaUserCircle /> 
                        </button>
                    </>
                )}
                <button className='ShoppingCart' onClick={toggleCart}> 
                    <FaShoppingCart /> 
                </button>
            </div>
        </div>
        <div className="info-bar">
            <p className="info-text">МартиМото ви пожелава весело и незабравимо изкарване на Коледните и Новогодишни празници!</p>
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