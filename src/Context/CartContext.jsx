import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/cart", { withCredentials: true })
            .then(response => {
                setCart(response.data.items || []);
            })
            .catch(error => console.error("Error fetching cart:", error));
    }, []);

    const addToCart = async (product) => {
        try {
            const response = await axios.post(`http://localhost:5000/cart`, product, { withCredentials: true });

            if (response.status === 200) {
                setCart(prevCart => [...prevCart, product]); 
            }
        } catch (error) {
            console.error("Грешка при добавяне в количката:", error);
        }
    };

    const removeFromCart = (productId) => {
        axios.delete(`http://localhost:5000/cart/${productId}`, { withCredentials: true })
            .then(() => {
                setCart(prevCart => prevCart.filter(item => item.id !== productId));
            })
            .catch(error => console.error("Error removing item:", error));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};