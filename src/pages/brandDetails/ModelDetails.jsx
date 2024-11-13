import React from 'react';
import { useParams } from 'react-router-dom';
import './modelDetails.css';
import modelDetailsData from "../brandDetails/modelDetailsData"

function ModelDetails() {
    const { modelName } = useParams();
    const subModels = modelDetailsData[modelName] || [];

    return (
        <div className="model-details">
            <h1 className="model-title">{modelName}</h1>
            <div className="title-underline"></div>
            <div className="model-grid">
                {subModels.map((subModel, index) => (
                    <div key={index} className="model-card">
                        <img src={subModel.img} alt={subModel.name} className="model-image" />
                        <p className="model-name">{subModel.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ModelDetails;