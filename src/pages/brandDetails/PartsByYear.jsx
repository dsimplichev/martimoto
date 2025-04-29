import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './partsByYear.css';
import Divider from '../../Card/Divider';




function PartsByYear() {
    const { brandName, modelName, year } = useParams(); 
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/parts?brand=${brandName}&model=${modelName}&year=${year}`
                );

                const data = await response.json();
                setParts(data);
            } catch (error) {
                console.error('Грешка при зареждане на части:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParts();
    }, [brandName, modelName, year]); 

    return (
        <div className="parts-by-year">
            <h1 className="brand-title5">Части за {brandName} {modelName} ({year})</h1>
            <Divider />

            {loading ? (
                <p>Зареждане...</p>
            ) : parts.length === 0 ? (
                <p>Няма намерени части за този модел и година.</p>
            ) : (
                <div className="parts-grid">
                    {parts.map((part) => (
                        <div key={part._id} className="part-card">
                            <img 
                                src={part.images[0]} 
                                alt={part.title} 
                                className="part-image" 
                            />
                            <h3>{part.title}</h3>
                            <p>{part.description}</p>
                            <p className="part-price">{part.price} лв.</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PartsByYear;