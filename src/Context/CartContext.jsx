import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 🟢 Зареждаме количката директно от localStorage при стартиране
  const [cart, setCart] = useState(() => {
    try {
      const guestCartData = JSON.parse(localStorage.getItem("guest_cart"));
      if (guestCartData && guestCartData.items) {
        const now = new Date().getTime();
        if (now > guestCartData.expiry) {
          localStorage.removeItem("guest_cart");
          return [];
        }
        return guestCartData.items;
      }
      return [];
    } catch (error) {
      console.error("Грешка при зареждане на guest_cart:", error);
      return [];
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);

  // 🔹 Проверяваме дали е логнат потребителят и зареждаме количката
  useEffect(() => {
    const checkAuthAndLoadCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/status", {
          withCredentials: true,
        });

        if (response.data.isAuthenticated) {
          setIsLoggedIn(true);
          await loadUserCart();
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Грешка при проверка на сесия:", error);
        setIsLoggedIn(false);
      } finally {
        setIsCartLoading(false);
      }
    };

    checkAuthAndLoadCart();
  }, []);

  // 🔹 Зареждаме количката на логнат потребител от бекенда
  const loadUserCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart", {
        withCredentials: true,
      });
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Грешка при зареждане на количката от бекенд:", error);
      setCart([]);
    }
  };

  // 🔹 Запазваме количка на гост в localStorage
  const saveGuestCart = (cartItems) => {
    const expiry = new Date().getTime() + 24 * 60 * 60 * 1000; // валидна 24ч
    const guestCartData = { items: cartItems, expiry };
    localStorage.setItem("guest_cart", JSON.stringify(guestCartData));
  };

  // 🔹 Добавяне на продукт в количката
  const addToCart = async (product) => {
    const selectedQuantity = product.quantity || 1;

    if (isLoggedIn) {
      try {
        await axios.post(
          "http://localhost:5000/cart",
          { productId: product._id, quantity: selectedQuantity },
          { withCredentials: true }
        );
        await loadUserCart();
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

  // 🔹 Премахване на продукт
  const removeFromCart = async (productId) => {
    if (isLoggedIn) {
      try {
        await axios.delete(`http://localhost:5000/cart/${productId}`, {
          withCredentials: true,
        });
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
      } catch (error) {
        console.error("Грешка при премахване на продукт:", error);
      }
    } else {
      const updatedCart = cart.filter((item) => item._id !== productId);
      setCart(updatedCart);
      saveGuestCart(updatedCart);
    }
  };

  // 🔹 Изчистване на количката
  const clearCart = async () => {
    if (isLoggedIn) {
      try {
        await axios.delete("http://localhost:5000/cart", {
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
    setIsLoggedIn(false);
    localStorage.removeItem("guest_cart");
    axios
      .post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
      .catch((error) => console.error("Грешка при logout:", error));
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