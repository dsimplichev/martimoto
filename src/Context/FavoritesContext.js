import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [favorites, setFavorites] = useState(() => {
    // Зареждаме от localStorage като пример
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (part) => {
    if (!favorites.find(fav => fav.id === part._id)) {
      setFavorites([...favorites, { id: part._id, title: part.title, price: part.price, image: part.images[0] }]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};