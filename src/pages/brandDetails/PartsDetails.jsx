import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import partsData from './partsData';  
import './partsDetails.css'; 
import { FaShoppingBasket } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";


function PartsDetails() {
    const { brandName, modelName, subModelName, yearRange } = useParams();  
    const allParts = partsData[brandName]?.[modelName]?.[subModelName]?.[yearRange] || [];
    const [currentPage, setCurrentPage] = useState(1);
    const partsPerPage = 20;
    
    const indexOfLastPart = currentPage * partsPerPage;
    const indexOfFirstPart = indexOfLastPart - partsPerPage;
    const currentParts = allParts.slice(indexOfFirstPart, indexOfLastPart);


    const nextPage = () => {
        if (indexOfLastPart < allParts.length) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };


    return (
        <div className="parts-details">
            <h1 className="parts-title">{yearRange}</h1>
            <div className="parts-underline"></div>
            <div className="parts-grid">
                {currentParts.map((part, index) => (
                    <div key={index} className="parts-card">
                        <img src={part.img} alt={part.title} className="parts-image" />
                        <p className="parts-name">{part.title}</p>
                        <div className="parts-info">
                        <p className="parts-price">{part.price ?`$${part.price.toFixed(2)}` : "N/A"}</p>
                            <button className="cart-btn"><FaShoppingBasket /></button>
                            <button className="srh-btn"><FaSearch /></button>
                    </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1} className="pagination-btn">Назад</button>
                <button onClick={nextPage} disabled={indexOfLastPart >= allParts.length} className="pagination-btn">Напред</button>
            </div>
        </div>
    );
}
export default PartsDetails;