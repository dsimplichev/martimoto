import { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
   
    const existingProduct = cart.find(item => item.id === product.id);

    if (!existingProduct) {
      setCart((prevCart) => [...prevCart, product]); 
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};