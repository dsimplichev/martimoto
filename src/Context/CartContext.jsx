import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isCartLoading, setIsCartLoading] = useState(true);


    useEffect(() => {
        const checkAuthAndLoadCart = async () => {
            try {
                const response = await axios.get("http://localhost:5000/auth/status", { withCredentials: true });

                if (response.data.isAuthenticated) {
                    const id = response.data.user.id;
                    console.log("🔐 Логнат си, userId:", id);

                    setIsLoggedIn(true);
                    setUserId(id);

                    await loadUserCart(id);
                } else {
                    console.log("👤 Гост си, зареждаме количка от localStorage");
                    setIsLoggedIn(false);
                    setUserId(null);
                    await loadGuestCart(); 
                }
            } catch (error) {
                console.error("Грешка при проверка на логина:", error);
                await loadGuestCart(); 
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

    
    const fetchProductDetails = async (items) => {
        const populatedItems = await Promise.all(
            items.map(async (item) => {
                let productData = null;
                let imageUrl = null;
                let price = null;
                let title = null;

                try {
                    
                    const response = await axios.get(`http://localhost:5000/products/${item.productId}`); // Предполагам, че имате такъв ендпойнт

                    if (response.data) {
                        productData = response.data;
                        imageUrl = productData.images && productData.images.length > 0 ? productData.images[0] : null;
                        price = productData.price;
                        title = productData.title;
                    }
                } catch (error) {
                    console.error("Грешка при зареждане на детайли за продукт:", item.productId, error);
                    return null; 
                }

                if (!productData) return null;

                return {
                    _id: productData._id,
                    title: productData.title,
                    price: productData.price,
                    image: imageUrl,
                    quantity: item.quantity,
                    itemType: item.itemType,
                };
            })
        );
        return populatedItems.filter((item) => item !== null);
    };


    const loadGuestCart = async () => { 
        const guestCartData = JSON.parse(localStorage.getItem("guest_cart"));
        if (guestCartData && guestCartData.items) {
            const now = new Date().getTime();
            if (now > guestCartData.expiry) {
                localStorage.removeItem("guest_cart");
                setCart([]);
            } else {
                
                const populatedCart = await fetchProductDetails(guestCartData.items);
                setCart(populatedCart);
            }
        } else {
            setCart([]);
        }
    };

    const saveGuestCart = (cartItems) => {
        const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
        
        const simplifiedCartItems = cartItems.map(item => ({
            productId: item._id, 
            quantity: item.quantity,
            itemType: item.itemType || "part" 
        }));
        const guestCartData = { items: simplifiedCartItems, expiry };
        localStorage.setItem("guest_cart", JSON.stringify(guestCartData));
    };

    const addToCart = async (product) => {
    const selectedQuantity = product.quantity || 1; 

    if (isLoggedIn) {
        try {
            await axios.post(
                `http://localhost:5000/cart/${userId}`,
                { productId: product._id, quantity: selectedQuantity },
                { withCredentials: true }
            );
            await loadUserCart(userId);
        } catch (error) {
            console.error("Грешка при добавяне в количката:", error);
        }
    } else {
        const existingItem = cart.find(
            item => item._id === product._id && item.itemType === product.itemType
        );

        let updatedCart;

        if (existingItem) {
            updatedCart = cart.map(item =>
                item._id === product._id && item.itemType === product.itemType
                    ? { ...item, quantity: item.quantity + selectedQuantity }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: selectedQuantity }];
        }

        setCart(updatedCart);
        saveGuestCart(updatedCart);
    }
};
    const removeFromCart = async (productId) => {
        if (isLoggedIn) {
            try {
                await axios.delete(`http://localhost:5000/cart/${userId}/${productId}`, { withCredentials: true });
                setCart(prevCart => prevCart.filter(item => item._id !== productId));
            } catch (error) {
                console.error("Грешка при премахване на продукт:", error);
            }
        } else {
            const updatedCart = cart.filter(item => item._id !== productId);
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
        localStorage.removeItem("guest_cart"); 
        axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
            .catch(error => console.error("Грешка при logout:", error));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, handleLogout, isCartLoading, userId }}>
            {children}
        </CartContext.Provider>
    );
};
