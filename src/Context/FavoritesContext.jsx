import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { isLoggedIn, user } = useContext(AuthContext);
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
          id: fav.partId,
          title: fav.title,
          price: fav.price,
          image: fav.image
        }));
        setFavorites(mapped);
      } catch (err) {
        console.error('Грешка при зареждане на любимите:', err);
      }
    };

    if (user && user.email) {
      fetchFavorites();
    }
  }, [user]);

  const addToFavorites = async (part) => {
    
    if (!favorites.find(fav => fav.partId === part._id)) {
      const newFavorite = {
        userEmail: user?.email,
        partId: part._id,
        title: part.title,
        price: part.price,
         image: (part.images && part.images.length > 0) ? part.images[0] : "/default-image.jpg",
      };

      try {
        const response = await fetch('http://localhost:5000/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newFavorite),
        });

        if (response.ok) {
          setFavorites(prev => [...prev, { partId: part._id, ...newFavorite }]);
        } else {
          console.error('Грешка при запис в MongoDB');
        }
      } catch (error) {
        console.error('Грешка при заявката за добавяне в любими:', error);
      }
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