import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { MdAddShoppingCart } from "react-icons/md";
import { IoHeartOutline } from "react-icons/io5";

import { CartContext } from "../../Context/CartContext";
import { FavoritesContext } from "../../Context/FavoritesContext";

import "./accessoryDetails.css";

function AccessoryDetails() {
    const { accessoryName } = useParams();
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const { addToCart } = useContext(CartContext);
    const { addToFavorites } = useContext(FavoritesContext);

    const getImageUrl = (image) => {
        if (!image) return "/default-image.jpg";
        if (image.startsWith("http")) return image;
        return `http://localhost:5000/uploads/${image}`;
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/accessories/${encodeURIComponent(accessoryName.toLowerCase())}`)
            .then((response) => {
                setAccessories(response.data);
                setLoading(false);
                setCurrentPage(1); // при нови данни да върне на първа страница
            })
            .catch((error) => {
                console.error("Грешка при заявката:", error);
                setError("Неуспешно зареждане на аксесоарите.");
                setLoading(false);
            });
    }, [accessoryName]);

    const handleAddToCart = (e, accessory) => {
        e.preventDefault();
        e.stopPropagation();

        const productToAdd = {
            _id: accessory._id,
            title: accessory.title,
            price: accessory.price,
            image: getImageUrl(accessory.images?.[0]),
            quantity: 1,
            type: "accessory"
        };

        addToCart(productToAdd);
        setPopupMessage(`Продуктът "${accessory.title}" беше добавен във вашата количка.`);
        setShowPopup(true);
    };

    const handleAddToFavorites = (e, accessory) => {
        e.preventDefault();
        e.stopPropagation();

        const favoriteItem = {
            _id: accessory._id,
            title: accessory.title,
            price: accessory.price,
            image: getImageUrl(accessory.images?.[0]),
            type: "accessory"
        };

        addToFavorites(favoriteItem);
        setPopupMessage(`Продуктът "${accessory.title}" беше добавен в любими.`);
        setShowPopup(true);
    };

    // Автоматично скриване на попъп след 3 секунди
    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showPopup]);

    const totalPages = Math.ceil(accessories.length / itemsPerPage);

    const paginatedAccessories = accessories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (_, page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <p className="loading-text">Зареждане...</p>;
    if (error) return <p className="error-text">{error}</p>;

    return (
        <div className="accessories-page">
            <div className="header-section-acc">
                <h1>{accessoryName}</h1>
            </div>
            <div className="divider-acc"></div>

            <div className="parts-grid">
                {paginatedAccessories.length > 0 ? (
                    paginatedAccessories.map((part) => (
                        <Link
                            to={`/parts/${part._id}`}
                            key={part._id}
                            className="part-card-link"
                        >
                            <div className="part-card">
                                <img
                                    src={getImageUrl(part.images?.[0])}
                                    alt={part.title}
                                    className="part-image"
                                />
                                <div className="part-info">
                                    <h3 className="part-title">{part.title}</h3>
                                    <div className="price-and-cart">
                                        <p className="part-price">{part.price} лв.</p>
                                        <div className="icon-group">
                                            <IoHeartOutline
                                                className="heart-icon"
                                                onClick={(e) => handleAddToFavorites(e, part)}
                                            />
                                            <MdAddShoppingCart
                                                className="cart-icon"
                                                onClick={(e) => handleAddToCart(e, part)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="no-accessories">
                        Няма налични аксесоари в тази категория.
                    </p>
                )}
            </div>

            {totalPages > 1 && (
                <Stack spacing={2} alignItems="center" marginTop={2} className="pagination-container">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                        className="pagination"
                    />
                </Stack>
            )}

            {/* Попъп за нотификация */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <p>{popupMessage}</p>
                        <button
                            className="popup-button"
                            onClick={() => setShowPopup(false)}
                        >
                            ОК
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AccessoryDetails;