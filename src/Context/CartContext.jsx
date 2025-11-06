import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);


  useEffect(() => {
    console.log("cart state updated:", cart);
  }, [cart]);

  useEffect(() => {
    if (isLoading) return;

    const loadCart = async () => {
      setIsCartLoading(true);
      try {
        if (isLoggedIn && user?._id) {
          console.log("Зареждане на количка за логнат потребител:", user._id);
          await loadUserCart(user._id);

        } else {
          console.log("Зареждане на гост-количка");
          loadGuestCart();
        }
      } catch (err) {
        console.error("Грешка при зареждане:", err);
        setCart([]);
      } finally {
        setIsCartLoading(false);
      }
    };

    loadCart();
  }, [isLoading, isLoggedIn, user?._id]);

  const loadUserCart = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${userId}`, {
        withCredentials: true,
      });
      console.log("Количка от бекенд:", response.data.items);
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Грешка при loadUserCart:", error);
      setCart([]);
    }
  };

  const loadGuestCart = () => {
    try {
      const data = localStorage.getItem("guest_cart");
      if (!data) return setCart([]);

      const parsed = JSON.parse(data);
      if (Date.now() > parsed.expiry) {
        localStorage.removeItem("guest_cart");
        return setCart([]);
      }

      setCart(parsed.items || []);
    } catch (error) {
      console.error("Грешка при guest_cart:", error);
      setCart([]);
    }
  };

  const saveGuestCart = (items) => {
    const expiry = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem("guest_cart", JSON.stringify({ items, expiry }));
  };


 const addToCart = async (product) => {
  const qty = product.quantity || 1;

  if (isLoggedIn && user?._id) {
    try {
      await axios.post(
        `http://localhost:5000/cart/${user._id}`,
        {
          productId: product._id,
          quantity: qty,
          itemType: product.itemType || "part",
        },
        { withCredentials: true }
      );

      await loadUserCart(user._id);

    } catch (err) {
      console.error("Грешка при добавяне:", err.response?.data || err.message);
    }
  } else {
   
    const updated = [...cart];
    const existing = updated.find(i => i._id === product._id && i.itemType === product.itemType);
    if (existing) {
      existing.quantity += qty;
    } else {
      updated.push({ ...product, quantity: qty });
    }
    setCart(updated);
    saveGuestCart(updated);
  }
};

  const removeFromCart = async (productId) => {
    if (isLoggedIn && user?._id) {
      try {
        await axios.delete(`http://localhost:5000/cart/${user._id}/${productId}`, {
          withCredentials: true,
        });
        setCart((prev) => prev.filter((i) => i._id !== productId));
      } catch (err) {
        console.error("Грешка при премахване:", err);
      }
    } else {
      const updated = cart.filter((i) => i._id !== productId);
      setCart(updated);
      saveGuestCart(updated);
    }
  };


  const clearCart = async () => {
    if (isLoggedIn && user?._id) {
      try {
        await axios.delete(`http://localhost:5000/cart/${user._id}`, {
          withCredentials: true,
        });
      } catch (err) {
        console.error("Грешка при clearCart:", err);
      }
    }
    setCart([]);
    saveGuestCart([]);
  };


  const handleLogout = () => {
    setCart([]);

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