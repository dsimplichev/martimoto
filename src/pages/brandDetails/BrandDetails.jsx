import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './brandDetails.css';
import modelsData from './modelsData';
import SectionHeader from '../../Card/SectionHeader';
import GeneralBrandCard from '../../Card/GeneralBrandCard';

function BrandDetails() {
    const { brandName } = useParams();
    
    const models = modelsData[brandName] || [];
    

    return (
        <div className="brand-details">
            <SectionHeader title={`Модели на ${brandName}`} /> 
            <div className="generic-grid"> 
                {models.map((model, index) => (
                    <GeneralBrandCard
                        key={index}
                        image={model.img}
                        title={model.name}
                        linkTo={`/brands/${brandName}/models/${model.name}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default BrandDetails;