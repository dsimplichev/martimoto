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
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={currentPage === index + 1 ? 'active-page' : ''}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
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