import React from 'react';
import './brand.css';
import { Link } from 'react-router-dom';

function BrandCard({ img, brandName }) {
    return (
        <Link to={`/brands/${brandName}`}>
        <div className="category-card">
            <img src={img} alt={brandName} />
            <p>{brandName}</p>
        </div>
        </Link>
    );
}

export default BrandCard;