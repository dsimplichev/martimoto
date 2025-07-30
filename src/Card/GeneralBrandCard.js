import React from 'react';
import { Link } from 'react-router-dom';

import './general-brand-card.css'; 

function GeneralBrandCard({ image, title, linkTo, children, cardClassName = "generic-card", titleClassName = "generic-card-title", imageClassName = "generic-card-image" }) {
    return (
        <div className={cardClassName}>
            <Link to={linkTo} className="generic-card-link">
                <img src={image} alt={title} className={imageClassName} />
                <p className={titleClassName}>{title}</p>
            </Link>
            {children}
        </div>
    );
}

export default GeneralBrandCard;