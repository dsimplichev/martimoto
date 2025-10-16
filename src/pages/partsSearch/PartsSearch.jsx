import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { FavoritesContext } from "../../Context/FavoritesContext";
import { AuthContext } from "../../Context/AuthContext";

import ProductCard from "../../Card/ProductCard";
import "./PartsSearch.css";

function PartsSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [notification, setNotification] = useState("");
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const { addToFavorites } = useContext(FavoritesContext);
    const { isLoggedIn } = useContext(AuthContext);

     const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(""), 3000);
    };
    
    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) return;

        try {
            const res = await fetch(`http://localhost:5000/api/search?query=${searchQuery}`);
            const data = await res.json();
            setResults(data);
        } catch (error) {
            console.error("Грешка при търсенето:", error);
            showNotification("Възникна грешка при търсенето.");
        }
    };

    
    const handleAddToCart = (e, productId) => {
        e.stopPropagation();
        e.preventDefault();

        const product = results.find(p => p._id === productId);
        if (product) {
            addToCart({
                ...product,
                image: product.images?.[0] || 'https://placehold.co/150x200/EEEEEE/AAAAAA?text=No+Image',
                quantity: 1
            });
            showNotification(`Продуктът "${product.title}" беше добавен в количката!`);
        }
    };

    
    const handleAddToFavorites = (e, productId) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isLoggedIn) {
            showNotification('Моля, влезте в профила си, за да добавяте в любими.');
           
            return;
        }

        const product = results.find(p => p._id === productId);
        if (product) {
            addToFavorites(product);
            showNotification("Продуктът беше добавен в любими!");
        }
    };

    
    const handleNavigate = (id, itemType) => {
        if (itemType === "part") {
            navigate(`/parts/${id}`);
        } else {
            navigate(`/accessories/detail/${id}`);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="parts-search-container">
            <div className="header-section2">
                <h2 className="title-parts-search2">Потърси</h2>
            </div>
            <div className="divider-parts"></div>

            <form className="search-form" onSubmit={handleSearch}>
                <div className="search-input-container">
                    <input
                        className="search-input2"
                        type="text"
                        placeholder="Намери лесно"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">Търси</button>
                </div>
            </form>

            
            <div className="products-grid-container">
                {results.length > 0 ? (
                    results.map(product => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            title={product.title}
                            img={product.images?.[0]}
                            price={product.price}
                            itemType={product.itemType}
                            onNavigate={handleNavigate}
                            onAddToCart={handleAddToCart}
                            onAddToFavorites={handleAddToFavorites}
                        />
                    ))
                ) : (
                    <p className="no-results">Няма намерени продукти.</p>
                )}
            </div>
              {notification && (
                <div className="cart-notification-center">{notification}</div>
            )}
        </div>
    );
}

export default PartsSearch;