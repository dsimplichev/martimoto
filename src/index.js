import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { FavoritesProvider } from './Context/FavoritesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <CartProvider> 
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
</React.StrictMode>
);