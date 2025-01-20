import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import partsData from './partsData';
import './partsDetails.css';
import { FaSearch, FaHeart, FaShoppingBasket } from "react-icons/fa";

function PartsDetails() {
    const { brandName, modelName, subModelName, yearRange } = useParams();
    const allParts = partsData[brandName]?.[modelName]?.[subModelName]?.[yearRange] || [];
    const [currentPage, setCurrentPage] = useState(1);
    const partsPerPage = 20;

    const [selectedPart, setSelectedPart] = useState(null);
    const [currentImage, setCurrentImage] = useState('');

    const indexOfLastPart = currentPage * partsPerPage;
    const indexOfFirstPart = indexOfLastPart - partsPerPage;
    const currentParts = allParts.slice(indexOfFirstPart, indexOfLastPart);

    const nextPage = () => {
        if (indexOfLastPart < allParts.length) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const openModal = (part) => {
        setSelectedPart(part);
        setCurrentImage(part.img); 
    };

    const closeModal = () => {
        setSelectedPart(null);
    };

    const handleThumbnailClick = (image) => {
        setCurrentImage(image);
    };

    return (
        <div className="parts-details">
            <h1 className="parts-title">{yearRange}</h1>
            <div className="parts-underline"></div>
            <div className="parts-grid">
                {currentParts.map((part, index) => (
                    <div key={index} className="parts-card">
                    <FaHeart className="FaHeart2" />
                    <img src={part.img} alt={part.title} className="parts-image" />
                    <p className="parts-name">{part.title}</p>
                    <div className="parts-info">
                        <p className="parts-price">{part.price ? `$${part.price.toFixed(2)}` : "N/A"}</p>
                        <button className="cart-btn"><FaShoppingBasket /></button>
                        <button className="srh-btn" onClick={() => openModal(part)} ><FaSearch /></button>
                    </div>
                </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1} className="pagination-btn">Назад</button>
                <button onClick={nextPage} disabled={indexOfLastPart >= allParts.length} className="pagination-btn">Напред</button>
            </div>
            {selectedPart && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={closeModal}>X</button>
                        <div className="modal-left">
                            <img src={currentImage} alt={selectedPart.title} className="modal-image" />
                            <div className="modal-thumbnails">
                                {selectedPart.additionalImages && selectedPart.additionalImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="thumbnail"
                                        onClick={() => handleThumbnailClick(img)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="modal-right">
                            <h2 className="modal-title">{selectedPart.title}</h2>
                            <p className="modal-price">
                                {selectedPart.price !== undefined
                                    ? `$${selectedPart.price.toFixed(2)}`
                                    : "Цена не е налична"}
                            </p>
                            <p className="modal-description">{selectedPart.description || "Няма описание."}</p>
                            <button className="modal-cart-btn">Добави в количката</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PartsDetails