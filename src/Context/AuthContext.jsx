import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [errorMessage, setErrorMessage] = useState(null); 

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
      setErrorMessage(null); 
    } catch (error) {
      
      if (error.response && error.response.data && error.response.data.message) {
        
        setErrorMessage(error.response.data.message);
        throw new Error(error.response.data.message); 
      }
      
      
      setErrorMessage('Възникна грешка при вход. Опитайте отново.');
      throw new Error('Възникна грешка при вход. Опитайте отново.');
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
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, setUser, login, logout, isLoading, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};