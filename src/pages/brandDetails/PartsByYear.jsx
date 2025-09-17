import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { FavoritesContext } from '../../Context/FavoritesContext';
import { AuthContext } from '../../Context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../../Card/ProductCard'; // <-- Import-вате вашата карта тук
import './partsByYear.css';
import SectionHeader from '../../Card/SectionHeader';

function PartsByYear() {
    const { brandName, modelName, year } = useParams();
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const { addToCart } = useContext(CartContext);
    const { addToFavorites } = useContext(FavoritesContext);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(parts.length / itemsPerPage);
    const indexOfLastPart = currentPage * itemsPerPage;
    const indexOfFirstPart = indexOfLastPart - itemsPerPage;
    const currentParts = parts.slice(indexOfFirstPart, indexOfLastPart);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/parts?brand=${brandName}&model=${modelName}&year=${year}`
                );
                const data = await response.json();
                setParts(data);
                setCurrentPage(1);
            } catch (error) {
                console.error('Грешка при зареждане на части:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParts();
    }, [brandName, modelName, year]);

    const handleAddToCart = (e, partId) => {
        e.stopPropagation();
        e.preventDefault();
        const part = parts.find(p => p._id === partId);
        if (part) {
            const productToAdd = {
                _id: part._id,
                title: part.title,
                price: part.price,
                image: part.images[0],
                itemType: "part",
            };
            addToCart(productToAdd);
            setPopupMessage(`Продуктът "${part.title}" беше добавен във вашата количка.`);
            setShowPopup(true);
        }
    };

    const handleAddToFavorites = (e, partId) => {
        e.stopPropagation();
        e.preventDefault();
        if (!isLoggedIn) {
            alert('Моля, влезте в профила си, за да добавяте в любими.');
            navigate('/login');
            return;
        }
        const part = parts.find(p => p._id === partId);
        if (part) {
            addToFavorites(part);
            setPopupMessage(`Продуктът "${part.title}" беше добавен в любими.`);
            setShowPopup(true);
        }
    };

    const handleNavigate = (id, itemType) => {
        if (itemType === "part") {
            navigate(`/parts/${id}`);
        } else {
            navigate(`/accessories/detail/${id}`);
        }
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
            if (startPage > 2) {
                pageNumbers.push('...');
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);
        }

        return pageNumbers.map((page, index) => {
            if (page === '...') {
                return <span key={index} className="ellipsis">...</span>;
            }
            return (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={currentPage === page ? 'active-page' : ''}
                >
                    {page}
                </button>
            );
        });
    };

    return (
        <>
            <div className="parts-by-year">
                <SectionHeader title={`Части за ${brandName} ${modelName} (${year})`} />

                {loading ? (
                    <p>Зареждане...</p>
                ) : parts.length === 0 ? (
                    <p className='noparts'>Няма намерени части за този модел и година.</p>
                ) : (
                    <>
                        <div className="parts-grid">
                            {currentParts.map((part) => (

                                <ProductCard
                                    key={part._id}
                                    id={part._id}
                                    title={part.title}
                                    price={part.price}
                                    img={part.images[0]}
                                    itemType="part"
                                    onNavigate={handleNavigate}
                                    onAddToCart={handleAddToCart}
                                    onAddToFavorites={handleAddToFavorites}
                                />
                            ))}
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
                         
                    </>
                )}
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <p>{popupMessage}</p>
                        <button className="popup-button" onClick={() => setShowPopup(false)}>
                            ОК
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default PartsByYear;