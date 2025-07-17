import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
        
        
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Неуспешно извличане на потребител:', error);
        setUser(null);
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

      console.log('User data after login:', response.data.user);
      setUser(response.data.user);

      return { success: true }; 
    } catch (error) {
      console.error('Грешка при вход:', error.response?.data?.message || error.message);

      return {
        success: false,
        message: error.response?.data?.message || 'Възникна грешка при вход. Опитайте отново.',
      }; 
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Грешка при изход:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, setUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};