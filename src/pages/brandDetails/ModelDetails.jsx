import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './modelDetails.css';
import modelDetailsData from '../brandDetails/modelDetailsData'; 
import SectionHeader from '../../Card/SectionHeader';

function ModelDetails() {
    const { brandName, modelName } = useParams(); 
    const subModels = modelDetailsData[modelName] || []; 

    return (
        <div className="model-details">
            <SectionHeader title={modelName} /> 
            <div className="model-grid2">
                {subModels.map((subModel, index) => {
                     
                    return (
                        <div key={index} className="model-card2">
                            <Link className="model-link" to={`/brands/${brandName}/models/${modelName}/${subModel.name}`}>
                                <img src={subModel.img} alt={subModel.name} className="model-image" />
                                <p className="model-name">{subModel.name}</p>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ModelDetails;