import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/auth/status", { withCredentials: true })
            .then(response => {
                if (response.data.isAuthenticated) {
                    setIsLoggedIn(true);
                    setUserId(response.data.user.id);
                    loadUserCart(response.data.user.id);
                } else {
                    setIsLoggedIn(false);
                    setUserId(null);
                    loadGuestCart();
                }
            })
            .catch(error => console.error("Грешка при проверка на логина:", error));
    }, []);

    
    const loadUserCart = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/cart/${userId}`, { withCredentials: true });
            setCart(response.data.items || []);
        } catch (error) {
            console.error("Грешка при зареждане на количката:", error);
        }
    };

    
    const loadGuestCart = () => {
        const guestCartData = JSON.parse(localStorage.getItem("guest_cart"));
        if (guestCartData) {
            const now = new Date().getTime();
            if (now > guestCartData.expiry) {
                localStorage.removeItem("guest_cart"); 
                setCart([]);
            } else {
                setCart(guestCartData.items);
            }
        } else {
            setCart([]);
        }
    };

    
    const saveGuestCart = (cartItems) => {
        const expiry = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 часа напред
        const guestCartData = { items: cartItems, expiry };
        localStorage.setItem("guest_cart", JSON.stringify(guestCartData));
    };

    
    const addToCart = async (product) => {
        if (isLoggedIn) {
            try {
                const response = await axios.post("http://localhost:5000/cart", { userId, product }, { withCredentials: true });
                if (response.status === 200) {
                    setCart((prevCart) => [...prevCart, product]);
                }
            } catch (error) {
                console.error("Грешка при добавяне в количката:", error);
            }
        } else {
            const updatedCart = [...cart, product];
            setCart(updatedCart);
            saveGuestCart(updatedCart);
        }
    };

    
    const removeFromCart = async (productId) => {
        if (isLoggedIn) {
            try {
                await axios.delete(`http://localhost:5000/cart/${userId}/${productId}`, { withCredentials: true });
                setCart(prevCart => prevCart.filter(item => item.id !== productId));
            } catch (error) {
                console.error("Грешка при премахване на продукт:", error);
            }
        } else {
            const updatedCart = cart.filter(item => item.id !== productId);
            setCart(updatedCart);
            saveGuestCart(updatedCart);
        }
    };

   
    const handleLogout = () => {
        setCart([]);
        setIsLoggedIn(false);
        setUserId(null);
        axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
            .catch(error => console.error("Грешка при logout:", error));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, handleLogout }}>
            {children}
        </CartContext.Provider>
    );
};