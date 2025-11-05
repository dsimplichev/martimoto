import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/user', {
          withCredentials: true,
        });

        if (response.data.user) {
          const { _id, username, email, role } = response.data.user;
          const userData = { _id, username, email, role };

          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          setUser(null);
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.warn('Грешка при проверка на потребител:', error);
        setUser(null);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/login',
        { email, password },
        { withCredentials: true }
      );

      const { _id, username, email: userEmail, role } = response.data.user;
      const userData = { _id, username, email: userEmail, role };

      
      localStorage.removeItem("guest_cart");

      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setErrorMessage(null);

      return userData;
    } catch (error) {
      const message = error.response?.data?.message || "Грешка при вход.";
      setErrorMessage(message);
      throw new Error(message);
    }
  };

  
  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('Грешка при изход:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('guest_cart');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        setUser,
        login,
        logout,
        isLoading,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};