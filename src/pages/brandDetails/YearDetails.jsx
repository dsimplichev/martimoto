import React from 'react';
import { useParams } from 'react-router-dom';
import yearDetailsData from './yearDetailsData';  
import './yearDetails.css';

function YearDetails() {
    const { brandName, modelName, subModelName, } = useParams();  
    const yearsData = yearDetailsData[modelName]?.[subModelName] || [];  
    


    return (
        <div className="year-details">
            <h1 className="year-title">{modelName} {subModelName}</h1>  
            <div className="year-underline"></div>
            <div className="year-grid">
                {yearsData.map((yearItem, index) => (
                    <div key={index} className="year-card">
                        <img src={yearItem.img} alt={yearItem.year} className="year-image" />
            
                        <p className="year-name">{yearItem.year}</p>
                       
                    </div>
                ))}
            </div>
        </div>
    );
}

export default YearDetails;