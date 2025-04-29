import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './yearDetails.css';

function YearDetails() {
    const { brandName, modelName, subModelName } = useParams(); 
    const [parts, setParts] = useState([]);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const res = await fetch(`/api/parts?brand=${brandName}&model=${modelName}&year=${subModelName}`);
                const data = await res.json();
                setParts(data);
            } catch (err) {
                console.error("Грешка при извличане на частите:", err);
            }
        };

        fetchParts();
    }, [brandName, modelName, subModelName]);

    return (
        <div className="year-details">
            <h1 className="year-title">{modelName} {subModelName}</h1>
            <div className="year-underline"></div>

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