import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { FavoritesContext } from "../../Context/FavoritesContext";
import { AuthContext } from "../../Context/AuthContext";

import ProductCard from "../../Card/ProductCard";
import "./lastproduct.css";
import SectionHeader from "../../Card/SectionHeader";

function LastProduct() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
    const [notification, setNotification] = useState("");
    const { addToCart } = useContext(CartContext);
    const { addToFavorites } = useContext(FavoritesContext);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();


    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(""), 3000);
    };


    const handleAddToCart = (e, productId) => {
        e.stopPropagation();
        e.preventDefault();
        const productToAdd = products.find(p => p._id === productId);
        if (productToAdd) {
            addToCart({
                ...productToAdd,
                image: productToAdd.images && productToAdd.images.length > 0
                    ? productToAdd.images[0]
                    : 'https://placehold.co/150x200/EEEEEE/AAAAAA?text=No+Image',
                quantity: 1
            });
            showNotification(`Продуктът "${productToAdd.title}" беше добавен в количката!`);
        }
    };

    const handleAddToFavorites = (e, productId) => {
        e.stopPropagation();
        e.preventDefault();
        if (!isLoggedIn) {
            showNotification('Моля, влезте в профила си, за да добавяте в любими.');
            navigate('/login');
            return;
        }
        const productToAdd = products.find(p => p._id === productId);
        if (productToAdd) {
            addToFavorites(productToAdd);
            alert("Продуктът беше добавен в любими!");
        }
    };

    const handleNavigate = (id, itemType) => {
        if (itemType === "part") {
            navigate(`/parts/${id}`);
        } else {
            navigate(`/accessories/detail/${id}`);
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        fetch("http://localhost:5000/api/last-products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) =>
                console.error("Грешка при зареждане на продуктите:", error)
            );
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="container4">
            <SectionHeader title="Последно добавени" />


            {currentProducts.length > 0 ? (
                <>
                    <div className="products-grid-container">
                        {currentProducts.map((product, index) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                title={product.title}
                                img={product.images[0]}
                                price={product.price}
                                itemType={product.itemType}
                                onNavigate={handleNavigate}
                                onAddToCart={handleAddToCart}
                                onAddToFavorites={handleAddToFavorites}
                            />
                        ))}
                    </div>

                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <p>Все още няма нови продукти.</p>
            )}

            {notification && (
                <div className="cart-notification-center">{notification}</div>
            )}
        </div>
    );
}

export default LastProduct;