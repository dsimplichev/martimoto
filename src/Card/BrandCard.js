import React from 'react';
import './brand.css';

function BrandCard({ imgSrc, brandName }) {
    return (
        <div className="category-card">
            <img src={imgSrc} alt={brandName} />
            <p>{brandName}</p>
        </div>
    );
}

export default BrandCard;