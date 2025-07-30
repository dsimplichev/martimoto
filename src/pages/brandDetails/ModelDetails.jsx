import React from 'react';
import { useParams } from 'react-router-dom';

import SectionHeader from '../../Card/SectionHeader';
import GeneralBrandCard from '../../Card/GeneralBrandCard';
import modelDetailsData from '../brandDetails/modelDetailsData'; 
import './modelDetails.css';

function ModelDetails() {
    const { brandName, modelName } = useParams(); 
    const subModels = modelDetailsData[modelName] || []; 

    return (
        <div className="model-details">
            <SectionHeader title={modelName} /> 
            <div className="generic-grid">
                {subModels.map((subModel, index) => (
                    <GeneralBrandCard
                        key={index}
                        image={subModel.img}
                        title={subModel.name}
                        linkTo={`/brands/${brandName}/models/${modelName}/${subModel.name}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ModelDetails;