import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './yearDetails.css';
import yearDetailsData from './yearDetailsData'; 

function YearDetails() {
    const { brandName, modelName, subModelName, yearRange } = useParams();
    const yearsData = yearDetailsData[modelName]?.[subModelName] || []; 
    const [parts, setParts] = useState([]);
    

    console.log(brandName, modelName, subModelName, yearRange); 
    
    
    useEffect(() => {
        const fetchParts = async () => {
            try {
                console.log('Sending request to:', `/api/parts/${brandName}/${modelName}/${subModelName}/${yearRange}`);
                const response = await fetch(`/api/parts/brands/${brandName}/models/${modelName}/${subModelName}/${yearRange}`);
                const data = await response.json();

                console.log('Response data:', data);
                
                if (Array.isArray(data)) {
                    setParts(data);  
                } else {
                    console.error('Няма части за показване.');
                }
            } catch (error) {
                console.error('Грешка при извличане на частите:', error);
            }
        };
    
        fetchParts();
    }, [brandName, modelName, subModelName, yearRange]);

    return (
        <div className="year-details">
            <h1 className="year-title">{modelName} {subModelName} {yearRange}</h1>
            <div className="year-underline"></div>
            <div className="year-grid">
                {yearsData.map((yearItem, index) => (
                    <div key={index} className="year-card">
                        <Link to={`/brands/${brandName}/models/${modelName}/${subModelName}/${yearItem.year}`}>
                            <img src={yearItem.img} alt={yearItem.yearRange} className="year-image" />
                            <p className="year-name">{yearItem.year}</p>
                        </Link>
                    </div>
                ))}
            </div>

            
            <div className="parts-list">
                
                {parts.length > 0 ? (
                    parts.map((part) => (
                        <div key={part._id} className="part-card">
                            <img src={part.images[0]} alt={part.title} className="part-image" />
                            <h3 className="part-title">{part.title}</h3>
                            <p className="part-description">{part.description}</p>
                            <p className="part-price">{part.price} лв</p>
                        </div>
                    ))
                ) : (
                    <p>Няма налични части за тази година.</p>
                )}
            </div>
        </div>
    );
}

export default YearDetails;