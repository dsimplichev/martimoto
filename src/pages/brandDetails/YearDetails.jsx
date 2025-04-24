import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import modelDetailsData from './modelDetailsData';
import './yearDetails.css';

function YearDetails() {
    const { brandName, modelName, subModelName, yearRange } = useParams();
    const [parts, setParts] = useState([]);

    const yearsData = modelDetailsData[modelName]?.[subModelName] || [];

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const res = await fetch(`/brands/:brandName/models/:modelName/:subModelName/:yearRange'`);
                const data = await res.json();
                setParts(data);
            } catch (err) {
                console.error("Грешка при извличане на частите:", err);
            }
        };

        fetchParts();
    }, [brandName, modelName, subModelName, yearRange]);

    return (
        <div className="year-details">
            <h1 className="year-title">{modelName} {subModelName}</h1>
            <div className="year-underline"></div>

            <div className="year-grid">
                {yearsData.map((yearItem, index) => (
                    <div key={index} className="year-card">
                        <Link className="year-name2" to={`/brands/${brandName}/models/${modelName}/${subModelName}/${yearItem.year}`}>
                            <img src={yearItem.img} alt={yearItem.year} className="year-image" />
                            <p className="year-name">{yearItem.year}</p>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="parts-section">

                <div className="parts-grid">
                    {parts.length > 0 ? (
                        parts.map((part) => (
                            <div key={part._id} className="part-card">
                                <img src={part.images[0]} alt={part.title} className="part-image" />
                                <h3>{part.title}</h3>
                                <p>{part.description}</p>
                                <p><strong>{part.price} лв</strong></p>
                            </div>
                        ))
                    ) : (
                        <p>Няма добавени части за тази година.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default YearDetails;