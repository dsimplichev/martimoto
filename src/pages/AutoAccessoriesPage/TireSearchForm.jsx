import React, { useState, useEffect } from 'react';
import { FaCar, FaTruck, FaCarSide, FaShoppingCart } from 'react-icons/fa'; // Добавена FaShoppingCart за по-реалистична икона "Купи"
import { RiSunFill, RiSnowyFill } from 'react-icons/ri';
import { FiCloudSnow } from 'react-icons/fi';
import './TireSearchForm.css';
import { TIRE_OPTIONS } from '../AutoAccessoriesPage/tireData';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function TireSearchForm() {
    const [tireType, setTireType] = useState('Автомобилни гуми');
    const [width, setWidth] = useState('Избери Широчина');
    const [ratio, setRatio] = useState('Избери Височина');
    const [diameter, setDiameter] = useState('Избери Диаметър');
    const [brand, setBrand] = useState('Избери Марка');
    const [season, setSeason] = useState('Летни');
    const [tires, setTires] = useState([]);

    const navigate = useNavigate();

    const currentOptions = TIRE_OPTIONS[tireType];

    useEffect(() => {
        setWidth('Избери Широчина');
        setRatio('Избери Височина');
        setDiameter('Избери Диаметър');
        setBrand('Избери Марка');
    }, [tireType]);


    const fetchTires = async () => {
        try {

            const response = await axios.get('http://localhost:5000/api/car-tires');
            setTires(response.data);
        } catch (err) {
            console.error('Грешка при зареждане на гуми:', err);
        }
    };

    useEffect(() => {
        fetchTires();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();

        alert(`Търсене на: ${tireType} | Размери: ${width}/${ratio}/${diameter} | Марка: ${brand} | Сезон: ${season}`);
    };

    const renderSelect = (stateValue, setStateFunction, label, key) => {
        if (!currentOptions || !currentOptions[key]) return null;

        return (
            <div className="select-wrapper">
                <select value={stateValue} onChange={(e) => setStateFunction(e.target.value)} className="select-param">
                    <option value={`Избери ${label}`} disabled>{label.toUpperCase()}</option>
                    {currentOptions[key].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
            </div>
        );
    };

    return (
        <div className="tire-search-container">
            <form onSubmit={handleSearch} className="search-form-new">


                <div className="select-group main-params-new">
                    {renderSelect(width, setWidth, 'Широчина', 'width')}
                    {renderSelect(ratio, setRatio, 'Височина', 'ratio')}
                    {renderSelect(diameter, setDiameter, 'Диаметър', 'diameter')}


                    <div className="select-wrapper brand-select-wrapper brand-select-in-row">
                        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="select-param brand-select-full">
                            <option value="Избери Марка" disabled>МАРКА</option>
                            {currentOptions.brand.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </div>

                </div>

                <div className="season-selection">
                    <button type="button" className={`season-button ${season === 'Всесезонни' ? 'active-season' : ''}`} onClick={() => setSeason('Всесезонни')}>
                        <FiCloudSnow className="season-icon all-season-icon" /> Всесезонни
                    </button>
                    <button type="button" className={`season-button ${season === 'Зимни' ? 'active-season' : ''}`} onClick={() => setSeason('Зимни')}>
                        <RiSnowyFill className="season-icon winter-icon" /> Зимни
                    </button>
                    <button type="button" className={`season-button ${season === 'Летни' ? 'active-season' : ''}`} onClick={() => setSeason('Летни')}>
                        <RiSunFill className="season-icon summer-icon" /> Летни
                    </button>
                </div>

                <button type="submit" className="search-button-new">
                    ТЪРСЕНЕ
                </button>
            </form>

            <div className="tire-list">
                {tires.length === 0 ? (
                    <p>Няма налични гуми.</p>
                ) : (
                    <div className="tire-grid">
                        {tires.map(tire => (
                            <div key={tire._id} className="tire-card">
                                <div className="tire-image-wrapper">
                                    <img
                                        src={tire.images && tire.images.length > 0 ? tire.images[0] : '/placeholder.png'}
                                        alt={`${tire.brand || ''} ${tire.model || ''}`}
                                        className="tire-image"
                                    />
                                </div>
                                <div className="tire-info-details">




                                    <p className="tire-subtitle">
                                        {tire.brand || 'Марка'} | {tire.model || 'Модел'}
                                    </p>


                                    <p className="tire-size-season">
                                        {tire.width}/{tire.aspectRatio}R{tire.diameter} | {tire.season}

                                        {tire.season === 'Всесезонни' && <FiCloudSnow className="season-icon-inline all-season-icon-inline" />}
                                        {tire.season === 'Зимни' && <RiSnowyFill className="season-icon-inline winter-icon-inline" />}
                                        {tire.season === 'Летни' && <RiSunFill className="season-icon-inline summer-icon-inline" />}
                                    </p>


                                    <div className="tire-price-row">
                                        <span className="tire-price-bgn">
                                            <strong>{Number(tire.price).toFixed(2)} лв.</strong>
                                        </span>
                                        <span className="tire-price-eur">
                                            / {(Number(tire.price) / 1.95583).toFixed(2)} &euro; <small className="price-vat">с ддс</small>
                                        </span>
                                    </div>


                                    <div className="tire-card-actions">
                                        <button
                                            className="view-details-button"
                                            onClick={() => navigate(`/tire/${tire._id}`)}
                                        >
                                            ВИЖТЕ ПОВЕЧЕ
                                        </button>
                                        <button className="buy-button">
                                            <FaShoppingCart className="buy-icon" /> КУПИ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TireSearchForm;