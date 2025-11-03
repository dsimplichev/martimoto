import { createContext, useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const hasLoadedRef = useRef(false);

  
  useEffect(() => {
    if (isLoading) return; 
    if (hasLoadedRef.current) return; 

    const loadCart = async () => {
      try {
        if (isLoggedIn && user?._id) {
          console.log("🔑 Зареждам количка за логнат потребител:", user._id);
          await loadUserCart(user._id);
          localStorage.removeItem("guest_cart"); 
        } else {
          console.log("👤 Зареждам количка за гост");
          loadGuestCart();
        }
      } catch (err) {
        console.error("Грешка при зареждане на количката:", err);
      } finally {
        setIsCartLoading(false);
        hasLoadedRef.current = true;
      }
    };

    loadCart();
  }, [isLoggedIn, isLoading, user?._id]);

  
  const loadUserCart = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${userId}`, {
        withCredentials: true,
      });
      console.log("🛒 Заредена количка от бекенда:", response.data);
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Грешка при зареждане на количката:", error);
      setCart([]);
    }
  };

  
  const loadGuestCart = () => {
    try {
      const guestCartData = JSON.parse(localStorage.getItem("guest_cart"));
      if (guestCartData && guestCartData.items) {
        const now = Date.now();
        if (now > guestCartData.expiry) {
          localStorage.removeItem("guest_cart");
          return;
        }
        setCart(guestCartData.items);
      }
    } catch (error) {
      console.error("Грешка при зареждане на guest_cart:", error);
    }
  };

  
  const saveGuestCart = (cartItems) => {
    const expiry = Date.now() + 24 * 60 * 60 * 1000;
    const guestCartData = { items: cartItems, expiry };
    localStorage.setItem("guest_cart", JSON.stringify(guestCartData));
  };

  
  const addToCart = async (product) => {
    const selectedQuantity = product.quantity || 1;

    if (isLoggedIn && user?._id) {
      try {
        await axios.post(
          `http://localhost:5000/cart/${user._id}`,
          { productId: product._id, quantity: selectedQuantity },
          { withCredentials: true }
        );
        await loadUserCart(user._id);
      } catch (error) {
        console.error("Грешка при добавяне в количката:", error);
      }
    } else {
      const existingItem = cart.find(
        (item) => item._id === product._id && item.itemType === product.itemType
      );

      let updatedCart;
      if (existingItem) {
        updatedCart = cart.map((item) =>
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
    if (isLoggedIn && user?._id) {
      try {
        await axios.delete(
          `http://localhost:5000/cart/${user._id}/${productId}`,
          { withCredentials: true }
        );
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
      } catch (error) {
        console.error("Грешка при премахване:", error);
      }
    } else {
      const updatedCart = cart.filter((item) => item._id !== productId);
      setCart(updatedCart);
      saveGuestCart(updatedCart);
    }
  };

  
  const clearCart = async () => {
    if (isLoggedIn && user?._id) {
      try {
        await axios.delete(`http://localhost:5000/cart/${user._id}`, {
          withCredentials: true,
        });
      } catch (error) {
        console.error("Грешка при изчистване на количката:", error);
      }
    }
    setCart([]);
    saveGuestCart([]);
  };

  
  const handleLogout = () => {
    setCart([]);
    localStorage.removeItem("guest_cart");
    hasLoadedRef.current = false;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        handleLogout,
        isCartLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};