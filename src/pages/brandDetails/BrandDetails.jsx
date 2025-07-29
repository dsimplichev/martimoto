import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './brandDetails.css';
import modelsData from './modelsData';
import SectionHeader from '../../Card/SectionHeader';

function BrandDetails() {
    const { brandName } = useParams();
    
    const models = modelsData[brandName] || [];
    

    return (
        <div className="brand-details">
            <SectionHeader title={`Модели на ${brandName}`} /> 
            <div className="model-grid">
                {models.map((model, index) => (
                    <div key={index} className="model-card">
                        <Link className="model-link"

                         to={`/brands/${brandName}/models/${model.name}`}>
                            <img src={model.img} alt={model.name} className="model-image" />
                            <p className="model-name2">{model.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BrandDetails;