import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isCartLoading, setIsCartLoading] = useState(true);

    // Този useEffect вече няма да е необходим за запазване на количката на гости,
    // тъй като saveGuestCart ще се извиква експлицитно.
    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
    //         const guestCartData = { items: cart, expiry };
    //         localStorage.setItem("guest_cart", JSON.stringify(guestCartData));
    //     } else {
    //         localStorage.removeItem("guest_cart");
    //     }
    // }, [cart, isLoggedIn]);

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
                    await loadGuestCart(); // Променено на await
                }
            } catch (error) {
                console.error("Грешка при проверка на логина:", error);
                await loadGuestCart(); // Променено на await
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

    // 🆕 Нова функция за обогатяване на продуктите за гости
    const fetchProductDetails = async (items) => {
        const populatedItems = await Promise.all(
            items.map(async (item) => {
                let productData = null;
                let imageUrl = null;
                let price = null;
                let title = null;

                try {
                    // Опитваме да вземем детайли за продукта от бекенда
                    const response = await axios.get(`http://localhost:5000/products/${item.productId}`); // Предполагам, че имате такъв ендпойнт

                    if (response.data) {
                        productData = response.data;
                        imageUrl = productData.images && productData.images.length > 0 ? productData.images[0] : null;
                        price = productData.price;
                        title = productData.title;
                    }
                } catch (error) {
                    console.error("Грешка при зареждане на детайли за продукт:", item.productId, error);
                    return null; // Връщаме null, ако продуктът не е намерен или има грешка
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


    const loadGuestCart = async () => { // Променено на async
        const guestCartData = JSON.parse(localStorage.getItem("guest_cart"));
        if (guestCartData && guestCartData.items) {
            const now = new Date().getTime();
            if (now > guestCartData.expiry) {
                localStorage.removeItem("guest_cart");
                setCart([]);
            } else {
                // 🆕 Извличаме пълните данни за продуктите
                const populatedCart = await fetchProductDetails(guestCartData.items);
                setCart(populatedCart);
            }
        } else {
            setCart([]);
        }
    };

    const saveGuestCart = (cartItems) => {
        const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
        // 🆕 Запазваме само productId, quantity и itemType за гости
        const simplifiedCartItems = cartItems.map(item => ({
            productId: item._id, // Използваме _id на продукта като productId
            quantity: item.quantity,
            itemType: item.itemType || "part" // Уверете се, че itemType е наличен или задайте стойност по подразбиране
        }));
        const guestCartData = { items: simplifiedCartItems, expiry };
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
            const existingItem = cart.find(item => item._id === product._id); // Все още сравняваме по _id, защото "cart" вече е "обогатена"
            let updatedCart;

            if (existingItem) {
                updatedCart = cart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Добавяме пълния обект, защото `cart` съдържа пълни обекти след `loadGuestCart`
                updatedCart = [...cart, { ...product, quantity: 1 }];
            }

            setCart(updatedCart);
            saveGuestCart(updatedCart); // Извикваме saveGuestCart с обновената количка
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
            saveGuestCart(updatedCart); // Извикваме saveGuestCart с обновената количка
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
        localStorage.removeItem("guest_cart"); // Добавяме изчистване на количката за гости при logout
        axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
            .catch(error => console.error("Грешка при logout:", error));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, handleLogout, isCartLoading, userId }}>
            {children}
        </CartContext.Provider>
    );
};
