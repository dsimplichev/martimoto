import React from 'react';
import './brand.css';
import { Link } from 'react-router-dom';

function BrandCard({ img, brandName }) {
    return (
        <Link to={`/brands/${brandName}`} className="category-card no-underline">
            <img src={img} alt={brandName} />
            <p className="brand-name">{brandName}</p>
        </Link>
    );
}

export default BrandCard;