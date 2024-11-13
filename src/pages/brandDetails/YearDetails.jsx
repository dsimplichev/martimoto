import React from 'react';
import { useParams } from 'react-router-dom';
import modelDetailsData from './modelDetailsData';
import './yearDetails.css';

function YearDetails() {
    const { modelName, subModelName, year } = useParams();
    const model = modelDetailsData[modelName]?.[subModelName]?.find(item => item.year === year);

    return (
        <div className="year-details">
            <h1>{modelName} - {subModelName} - {year}</h1>
            <div className="model-image-container">
                <img src={model?.img} alt={year} className="model-image" />
            </div>
        </div>
    );
}

export default YearDetails;