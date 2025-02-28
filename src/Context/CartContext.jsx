import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext); 
  const [cart, setCart] = useState([]);
  
  
  useEffect(() => {
    if (user) {
      axios.get(`/api/cart/${user.id}`)
        .then(response => {
          setCart(response.data);
        })
        .catch(error => {
          console.error("Грешка при зареждане на количката:", error);
        });
    }
  }, [user]); 

  
  const addToCart = (product) => {
    if (user) {
      axios.post(`/api/cart/${user.id}`, { product })
        .then(response => {
          setCart(response.data); 
        })
        .catch(error => {
          console.error("Грешка при добавяне на продукт в количката:", error);
        });
    } else {
      
      console.log("Моля, влезте в акаунта си!");
    }
  };

  
  const removeFromCart = (productId) => {
    if (user) {
      axios.delete(`/api/cart/${user.id}/product/${productId}`)
        .then(response => {
          setCart(response.data); 
        })
        .catch(error => {
          console.error("Грешка при премахване на продукт от количката:", error);
        });
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};