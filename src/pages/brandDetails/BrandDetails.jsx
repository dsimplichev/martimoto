import React from 'react';
import { useParams } from 'react-router-dom';
import './brandDetails.css';

const models = [
    { name: "S1000R", img: "/path/to/s1000r.jpg" },
    { name: "S1000RR", img: "/path/to/s1000rr.jpg" },
    { name: "F800", img: "/path/to/f800.jpg" },
    { name: "R80", img: "/path/to/r80.jpg" },
    { name: "1300GS", img: "/path/to/1300gs.jpg" }
];

function BrandDetails() {
    const { brandName } = useParams();

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