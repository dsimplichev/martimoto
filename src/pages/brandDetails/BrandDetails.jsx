import React from 'react';
import { useParams } from 'react-router-dom';
import './brandDetails.css';
import modelsData from './modelsData';




function BrandDetails() {
    const { brandName } = useParams();
   
    const models = modelsData[brandName] || [];

    return (
        <div className="brand-details">
            <h1 className="brand-title">{brandName}</h1>
            <div className="title-underline"></div>
            
            <div className="model-grid">
                {models.map((model, index) => (
                    <div key={index} className="model-card">
                        <img src={model.img} alt={model.name} className="model-image" />
                        <p className="model-name">{model.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BrandDetails;