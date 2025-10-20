import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import SectionHeader from '../../Card/SectionHeader';
import './MatsPage.css';
import { MATS_SEARCH_OPTIONS } from '../AutoAccessoriesPage/matsData';
import { FaShoppingCart } from 'react-icons/fa';

function MatsPage() {
    const [brand, setBrand] = useState('Избери Марка');
    const [model, setModel] = useState('Избери Модел');
    const [material, setMaterial] = useState('Избери Материал');

    const [mats, setMats] = useState([]);
    const [filteredMats, setFilteredMats] = useState([]);

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


    const addToCart = (item) => {
        console.log("Добавяне в количката:", item);
    };

    const handleBuyClick = (mat) => {
        const item = {
            _id: mat._id,
            title: mat.title,
            price: mat.price,
            quantity: 1,
            image: mat.images?.[0] || null
        };
        addToCart(item);
        console.log(`Продукт "${mat.title}" успешно добавен в количката.`);
    };

    const handleDetailsClick = (matId) => {
        console.log(`Пренасочване към страница за детайли на продукт с ID: ${matId}`);
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
                    <p className="no-items-message">Няма намерени артикули според зададените критерии.</p>
                ) : (
                    <div className="mats-grid">
                        {filteredMats.map(mat => (
                            <div key={mat._id} className="mat-card">
                                {mat.images[0] && <img
                                    src={mat.images[0]}
                                    alt={mat.title}
                                    className="mat-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/400x300/e6e6e6/000?text=NO+IMAGE";
                                    }}
                                />}
                                <h3 title={mat.title}>{mat.title}</h3>
                                <p><strong>Марка:</strong> {mat.carBrand}</p>
                                <p><strong>Модел:</strong> {mat.carModel}</p>
                                <p><strong>Материал:</strong> {mat.material}</p>
                                <div className="mats-price-row">
                                        <span className="mats-price-bgn"><strong>{Number(mat.price).toFixed(2)} лв.</strong></span>
                                        <span className="mats-price-eur">/ {(Number(mat.price) / 1.95583).toFixed(2)} &euro;</span>
                                    </div>
                                <div className="mat-buttons-container">
                                    <button
                                        className="mat-button-details"
                                        onClick={() => handleDetailsClick(mat._id)}
                                    >
                                        Виж Повече
                                    </button>
                                    <button
                                        className="mat-button-buy"
                                        onClick={() => handleBuyClick(mat)}
                                    >
                                       <FaShoppingCart className="mats-buy-icon" /> Купи
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MatsPage;