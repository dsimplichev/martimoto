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
            showNotification("Продуктът беше добавен в любими!");
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

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // 🚀 НОВА ФУНКЦИЯ ЗА ГЕНЕРИРАНЕ НА ИНТЕЛИГЕНТНИ БУТОНИ
    const renderPaginationButtons = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5; // Брой видими страници (напр. 1, 2, 3, 4, 5...)
        const boundarySize = 1;    // Колко бутона да показваме в началото и края
        const ellipsis = '...';

        if (totalPages <= maxVisiblePages) {
            // Ако страниците са малко, показваме всички
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Винаги показваме първата страница
            pageNumbers.push(1);

            let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2) + 1);
            let endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxVisiblePages / 2) - 1);

            // Регулираме началото/края, ако е близо до границите
            if (currentPage < maxVisiblePages - 1) {
                endPage = maxVisiblePages - 1;
                startPage = 2;
            } else if (currentPage > totalPages - maxVisiblePages + 2) {
                startPage = totalPages - maxVisiblePages + 2;
                endPage = totalPages - 1;
            }

            // Добавяме елипсис след първата страница, ако е необходимо
            if (startPage > boundarySize + 1) {
                pageNumbers.push(ellipsis);
            }

            // Добавяме страниците около текущата
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Добавяме елипсис преди последната страница, ако е необходимо
            if (endPage < totalPages - boundarySize) {
                pageNumbers.push(ellipsis);
            }

            // Винаги показваме последната страница, освен ако не е първа
            if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
                pageNumbers.push(totalPages);
            }
        }

        return (
            <>
                {/* Бутон "Предишна" */}
                <button
                    className="page-btn"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &laquo;
                </button>

                {/* Динамично генерирани страници */}
                {pageNumbers.map((page, index) => {
                    if (page === ellipsis) {
                        return <span key={index} className="ellipsis">{ellipsis}</span>;
                    }
                    return (
                        <button
                            key={index}
                            className={`page-btn ${currentPage === page ? "active" : ""}`}
                            onClick={() => paginate(page)}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Бутон "Следваща" */}
                <button
                    className="page-btn"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    &raquo;
                </button>
            </>
        );
    };
    // ----------------------------------------------------------------------

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
                        {renderPaginationButtons()} 
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