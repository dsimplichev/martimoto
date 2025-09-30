import React, { useState } from 'react';
import { FaCar, FaTruck, FaMotorcycle } from 'react-icons/fa'; 
import './OilSearchForm.css'; 

const OIL_TYPES = {
    CAR: 'Автомобилни масла',
    TRUCK: 'Масла за камиони',
    MOTO: 'Масла за мотори',
};

function OilSearchForm() {
    
    const [oilType, setOilType] = useState(OIL_TYPES.CAR); 

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Търсене на: ${oilType}`);
    };

    return (
        <div className="oil-search-container">
            <form onSubmit={handleSearch} className="search-form-new">

                
                <div className="oil-type-selection">
                    
                    
                    <div
                        className={`type-card ${oilType === OIL_TYPES.CAR ? 'active' : ''}`}
                        onClick={() => setOilType(OIL_TYPES.CAR)}
                    >
                        <FaCar className="type-icon" />
                        <span>{OIL_TYPES.CAR}</span>
                    </div>
                    
                   
                    <div
                        className={`type-card ${oilType === OIL_TYPES.TRUCK ? 'active' : ''}`}
                        onClick={() => setOilType(OIL_TYPES.TRUCK)}
                    >
                        <FaTruck className="type-icon" />
                        <span>{OIL_TYPES.TRUCK}</span>
                    </div>
                    
                    
                    <div
                        className={`type-card ${oilType === OIL_TYPES.MOTO ? 'active' : ''}`}
                        onClick={() => setOilType(OIL_TYPES.MOTO)}
                    >
                        <FaMotorcycle className="type-icon" />
                        <span>{OIL_TYPES.MOTO}</span>
                    </div>
                </div>
                
                
                <button type="submit" className="search-button-new">
                    ТЪРСЕНЕ
                </button>
            </form>
        </div>
    );
}

export default OilSearchForm;