import React from 'react';
import { useParams } from 'react-router-dom';
import partsData from './partsData';  
import './partsDetails.css'; 

function PartsDetails() {
    const { brandName, modelName, subModelName, yearRange } = useParams();  
    const partsForYear = partsData[brandName]?.[modelName]?.[subModelName]?.[yearRange] || [];

    return (
        <div className="parts-details">
            <div className="parts-grid">
                {partsForYear.map((part, index) => (
                    <div key={index} className="parts-card">
                        <img src={part.img} alt={part.title} className="parts-image" />
                        <p className="parts-name">{part.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PartsDetails;