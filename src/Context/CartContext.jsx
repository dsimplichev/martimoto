import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isCartLoading, setIsCartLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) {
            const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
            const guestCartData = { items: cart, expiry };
            localStorage.setItem("guest_cart", JSON.stringify(guestCartData));
        } else {
            localStorage.removeItem("guest_cart");
        }
    }, [cart, isLoggedIn]);

    useEffect(() => {
    const checkAuthAndLoadCart = async () => {
        try {
            const response = await axios.get("http://localhost:5000/auth/status", { withCredentials: true });

            if (response.data.isAuthenticated) {
                const id = response.data.user.id;
                console.log("🔐 Логнат си, userId:", id);

                setIsLoggedIn(true);
                setUserId(id);

                // Изчакваме userId да се сетне, после зареждаме количката
                await loadUserCart(id);
            } else {
                console.log("👤 Гост си, зареждаме количка от localStorage");
                setIsLoggedIn(false);
                setUserId(null);
                loadGuestCart();
            }
        } catch (error) {
            console.error("Грешка при проверка на логина:", error);
            loadGuestCart();
        } finally {
            setIsCartLoading(false);
        }
    };

    checkAuthAndLoadCart();
}, []);

    const loadUserCart = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/cart/${userId}`, { withCredentials: true });
            console.log("Заредена количка от бекенд:", response.data.items);
            setCart(response.data.items || []);
        } catch (error) {
            console.error("Грешка при зареждане на количката:", error);
            setCart([]);
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
        const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
        const guestCartData = { items: cartItems, expiry };
        localStorage.setItem("guest_cart", JSON.stringify(guestCartData));
    };


    const addToCart = async (product) => {
        if (isLoggedIn) {
            try {
                await axios.post(
                    `http://localhost:5000/cart/${userId}`,
                    { productId: product._id, quantity: 1 },
                    { withCredentials: true }
                );

                
                await loadUserCart(userId);
            } catch (error) {
                console.error("Грешка при добавяне в количката:", error);
            }
        } else {
            const existingItem = cart.find(item => item._id === product._id);
            let updatedCart;

            if (existingItem) {
                updatedCart = cart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedCart = [...cart, { ...product, quantity: 1 }];
            }

            setCart(updatedCart);
            saveGuestCart(updatedCart);
        }
    };


    const removeFromCart = async (productId) => {
        if (isLoggedIn) {
            try {
                await axios.delete(`http://localhost:5000/cart/${userId}/${productId}`, { withCredentials: true });
                setCart(prevCart => prevCart.filter(item => item._id !== productId)); // ⬅️ fix тук
            } catch (error) {
                console.error("Грешка при премахване на продукт:", error);
            }
        } else {
            const updatedCart = cart.filter(item => item._id !== productId); // ⬅️ fix тук
            setCart(updatedCart);
            saveGuestCart(updatedCart);
        }
    };

    const clearCart = async () => {
        if (isLoggedIn) {
            try {

                await axios.delete(`http://localhost:5000/cart/${userId}`, { withCredentials: true });
            } catch (error) {
                console.error("Грешка при изчистване на количката:", error);
            }
        }

        setCart([]);
        saveGuestCart([]);
    };


    const handleLogout = () => {
        setCart([]);
        setIsLoggedIn(false);
        setUserId(null);
        axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
            .catch(error => console.error("Грешка при logout:", error));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, handleLogout, isCartLoading, userId }}>
            {children}
        </CartContext.Provider>
    );
};