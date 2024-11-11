import React from 'react';
import { useParams } from 'react-router-dom';
import './brandDetails.css';
import s1000r from "../../assets/BMW/s1000r.png"
import s1000rr from "../../assets/BMW/s1000rr.png"

const models = [
    { name: "S1000R", img: s1000r },
    { name: "S1000RR", img: s1000rr },
 
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