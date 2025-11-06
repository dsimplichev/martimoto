import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../../Card/ProductCard';
import SectionHeader from '../../Card/SectionHeader';
import { CartContext } from '../../Context/CartContext';
import './productresults.css';

function ProductResults() {
    const [accessories, setAccessories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [notification, setNotification] = useState('');
    const itemsPerPage = 12;

    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    const { addToCart } = useContext(CartContext);

    
    useEffect(() => {
        fetch(`http://localhost:5000/api/search?query=${query}`)
            .then((res) => res.json())
            .then((data) => {
                setAccessories(data);
                setCurrentPage(1);
            })
            .catch((error) => console.error("Грешка при търсенето на аксесоари:", error));
    }, [query]);

    
    const handleNavigate = (id, type) => {
        if (type === "part") {
            navigate(`/parts/${id}`);
        } else {
            navigate(`/accessories/detail/${id}`);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAddToCart = (e, id) => {
        e.stopPropagation();

        const product = accessories.find(a => a._id === id);
        if (product) {
            addToCart({
                _id: product._id,
                title: product.title,
                price: product.price,
                image: product.images[0],
                itemType: product.type,
                quantity: 1
            });
        }
    };

    
    const handleAddToFavorites = (e, id) => {
        e.stopPropagation();
        const token = localStorage.getItem('token');

        if (!token) {
            setNotification('Моля, влезте в профила си, за да добавите този продукт в Любими.');
            setTimeout(() => setNotification(''), 4000);
            return;
        }

       
        console.log("Добавен в любими продукт:", id);
    };

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = accessories.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(accessories.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPaginationButtons = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) pageNumbers.push("...");
        }

        for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pageNumbers.push("...");
            pageNumbers.push(totalPages);
        }

        return pageNumbers.map((page, index) =>
            page === "..."
                ? <span key={index} className="ellipsis">...</span>
                : <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={currentPage === page ? "active-page" : ""}
                >
                    {page}
                </button>
        );
    };

    return (
        <div className="product-results-container">
            
            {notification && (
                <div className="favorites-notification fade-in">
                    {notification}
                </div>
            )}

            <SectionHeader title={`Резултат от търсенето: ${query}`} />

            <div className="product-results">
                {currentItems.length > 0 ? (
                    currentItems.map((accessory, index) => (
                        <ProductCard
                            key={index}
                            id={accessory._id}
                            img={accessory.images[0]}
                            title={accessory.title}
                            price={accessory.price}
                            itemType={accessory.type}
                            onNavigate={handleNavigate}
                            onAddToCart={handleAddToCart}
                            onAddToFavorites={handleAddToFavorites}
                        />
                    ))
                ) : (
                    <div className='product-results2'>Няма намерени аксесоари.</div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <i className="fas fa-chevron-left"></i> Prev
                    </button>
                    {renderPaginationButtons()}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProductResults;