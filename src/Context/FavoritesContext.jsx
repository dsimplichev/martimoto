import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/favorites/${user?.email}`);
        const data = await res.json();

        const mapped = data.map(fav => ({
          id: fav.partId || fav.itemId, 
          title: fav.title,
          price: fav.price,
          image: fav.image,
          type: fav.type || 'part', 
        }));

        setFavorites(mapped);
      } catch (err) {
        console.error('Грешка при зареждане на любимите:', err);
      }
    };

    if (user && user.email) fetchFavorites();
  }, [user]);

  
  const addToFavorites = async (item) => {
    
    if (favorites.some(fav => fav.id === item._id)) return;

    const newFavorite = {
      userEmail: user?.email,
      partId: item._id, 
      title: item.title,
      price: item.price,
      image: item.image || (item.images && item.images[0]) || "/default-image.jpg",
      type: item.type || "part",
    };

    try {
      const response = await fetch('http://localhost:5000/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFavorite),
      });

      if (response.ok) {
        setFavorites(prev => [
          ...prev,
          { id: item._id, title: item.title, price: item.price, image: newFavorite.image, type: newFavorite.type }
        ]);
      } else {
        console.error('Грешка при запис в MongoDB');
      }
    } catch (error) {
      console.error('Грешка при заявката за добавяне в любими:', error);
    }
  };

  
  const removeFromFavorites = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/favorites/${user.email}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFavorites(prev => prev.filter(fav => fav.id !== id));
      } else {
        console.error('Грешка при изтриване от любими');
      }
    } catch (error) {
      console.error('Грешка при заявката за изтриване:', error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};