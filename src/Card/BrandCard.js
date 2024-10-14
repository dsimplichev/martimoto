import React from 'react';
import './brand.css';

function BrandCard({ img, brandName }) {
    return (
        <div className="category-card">
            <img src={img} alt={brandName} />
            <p>{brandName}</p>
        </div>
    );
}

export default BrandCard;