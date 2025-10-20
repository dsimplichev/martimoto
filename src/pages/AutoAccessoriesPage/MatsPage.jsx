import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import SectionHeader from '../../Card/SectionHeader';
import './MatsPage.css';
import { MATS_SEARCH_OPTIONS } from '../AutoAccessoriesPage/matsData';

function MatsPage() {
    const [brand, setBrand] = useState('Избери Марка');
    const [model, setModel] = useState('Избери Модел');
    const [material, setMaterial] = useState('Избери Материал');

    const [mats, setMats] = useState([]); // всички стелки
    const [filteredMats, setFilteredMats] = useState([]); // филтрирани за показване

    const brandOptions = Object.keys(MATS_SEARCH_OPTIONS.Марки);
    const materialOptions = MATS_SEARCH_OPTIONS.Материал || [];

    const modelOptions = useMemo(() => {
        return MATS_SEARCH_OPTIONS.Марки[brand] || [];
    }, [brand]);

    useEffect(() => {
        const fetchMats = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/mats');
                setMats(response.data);
                setFilteredMats(response.data);
            } catch (err) {
                console.error('Грешка при зареждане на стелки:', err);
            }
        };
        fetchMats();
    }, []);

    const handleBrandChange = (newBrand) => {
        setBrand(newBrand);
        setModel('Избери Модел'); 
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (brand === 'Избери Марка' || model === 'Избери Модел') {
            alert("Моля, изберете Марка и Модел на автомобила.");
            return;
        }

        const results = mats.filter(mat => 
            mat.carBrand === brand &&
            mat.carModel === model &&
            (material === 'Избери Материал' || mat.material === material)
        );

        setFilteredMats(results);
    };

    const renderSelect = (stateValue, setStateFunction, label, options) => {
        const key = label; 
        return (
            <div className="select-wrapper">
                <select 
                    value={stateValue} 
                    onChange={(e) => setStateFunction(e.target.value)} 
                    className="select-param"
                    disabled={key === 'Модел' && brand === 'Избери Марка'}
                >
                    <option value={`Избери ${label}`} disabled>{label.toUpperCase()}</option>
                    {options.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
            </div>
        );
    };

    return (
        <div className="mats-page-container">
            <SectionHeader title="СТЕЛКИ" />

            <form onSubmit={handleSearch} className="search-form-new mats-search-form">
                {renderSelect(brand, handleBrandChange, 'Марка', brandOptions)}
                {renderSelect(model, setModel, 'Модел', modelOptions)}
                {renderSelect(material, setMaterial, 'Материал', materialOptions)}

                <button type="submit" className="search-mats-button-new">
                    ТЪРСЕНЕ
                </button>
            </form>

            <div className="mats-content">
                {filteredMats.length === 0 ? (
                    <p className="no-items-message">Няма добавени артикули в тази категория.</p>
                ) : (
                    <div className="mats-grid">
                        {filteredMats.map(mat => (
                            <div key={mat._id} className="mat-card">
                                {mat.images[0] && <img src={mat.images[0]} alt={mat.title} className="mat-image" />}
                                <h3>{mat.title}</h3>
                                <p><strong>Марка:</strong> {mat.carBrand}</p>
                                <p><strong>Модел:</strong> {mat.carModel}</p>
                                <p><strong>Материал:</strong> {mat.material}</p>
                                <p><strong>Цена:</strong> {mat.price} лв.</p>
                                {mat.description && <p>{mat.description}</p>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MatsPage;