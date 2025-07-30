import React from 'react';
import { Link } from 'react-router-dom';
import './accessory-category-card.css'; 

function AccessoryCategoryCard({ image, name, linkTo }) {
    return (
        <Link to={linkTo} className="accessory-category-card">
            <img src={image} alt={name} className="accessory-category-image" />
            <p className="accessory-category-name">{name}</p>
        </Link>
    );
}

export default AccessoryCategoryCard;
