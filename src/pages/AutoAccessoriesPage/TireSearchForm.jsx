import React, { useState, useEffect, useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { RiSunFill, RiSnowyFill } from 'react-icons/ri';
import { FiCloudSnow } from 'react-icons/fi';
import './TireSearchForm.css';
import { TIRE_OPTIONS } from '../AutoAccessoriesPage/tireData';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../Context/CartContext';

function TireSearchForm() {
    const [tireType, setTireType] = useState('Автомобилни гуми');
    const [width, setWidth] = useState('Избери Широчина');
    const [ratio, setRatio] = useState('Избери Височина');
    const [diameter, setDiameter] = useState('Избери Диаметър');
    const [brand, setBrand] = useState('Избери Марка');
    const [season, setSeason] = useState('ANY'); 
    const [allTires, setAllTires] = useState([]);
    const [displayedTires, setDisplayedTires] = useState([]);
    const [notification, setNotification] = useState("");
    const { addToCart } = useContext(CartContext);
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
            setAllTires(response.data);
            setDisplayedTires(response.data); 
        } catch (err) {
            console.error('Грешка при зареждане на гуми:', err);
        }
    };

    useEffect(() => {
        fetchTires();
    }, []);

    
    const handleAddToCart = (tire) => {
        const productForCart = {
            _id: tire._id,
            title: `${tire.brand} ${tire.model}`,
            price: tire.price,
            image: tire.images && tire.images.length > 0 ? tire.images[0] : '/placeholder.png',
            itemType: "tire",
            quantity: 1
        };
        addToCart(productForCart);
        setNotification(`Продукт "${tire.brand} ${tire.model}" е добавен в количката.`);
        setTimeout(() => setNotification(""), 3000);
    };


    const handleSearch = (e, explicitSeason = season) => {
        if (e) e.preventDefault();

        const currentSeason = explicitSeason;

        const filteredTires = allTires.filter(tire => {
            const widthMatch = width === 'Избери Широчина' || tire.width === Number(width);
            const ratioMatch = ratio === 'Избери Височина' || tire.aspectRatio === Number(ratio);
            const diameterMatch = diameter === 'Избери Диаметър' || tire.diameter.toString().replace(/R/gi, '') === diameter.toString().replace(/R/gi, '');
            const brandMatch = brand === 'Избери Марка' || tire.brand === brand;
            const seasonMatch = currentSeason === 'ANY' || tire.season?.trim().toLowerCase() === currentSeason.toLowerCase();

            return widthMatch && ratioMatch && diameterMatch && brandMatch && seasonMatch;
        });

        setDisplayedTires(filteredTires);
    };


    const handleSeasonChange = (newSeason) => {
        const nextSeason = season === newSeason ? 'ANY' : newSeason;
        setSeason(nextSeason);
        setTimeout(() => handleSearch(null, nextSeason), 0);
    };


    const resetSearch = () => {
        setWidth('Избери Широчина');
        setRatio('Избери Височина');
        setDiameter('Избери Диаметър');
        setBrand('Избери Марка');
        setSeason('ANY');
        setDisplayedTires(allTires);
    };


    const renderSelect = (stateValue, setStateFunction, label, key) => {
        if (!currentOptions || !currentOptions[key]) return null;
        return (
            <div className="select-wrapper">
                <select
                    value={stateValue}
                    onChange={(e) => setStateFunction(e.target.value)}
                    className="select-param"
                >
                    <option value={`Избери ${label}`} disabled>{label.toUpperCase()}</option>
                    {currentOptions[key].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
            </div>
        );
    };

    return (
        <div className="tire-search-container">
            {notification && <div className="cart-notification-center">{notification}</div>}
            <form onSubmit={handleSearch} className="search-form-new">
                <div className="select-group main-params-new">
                    {renderSelect(width, setWidth, 'Широчина', 'width')}
                    {renderSelect(ratio, setRatio, 'Височина', 'ratio')}
                    {renderSelect(diameter, setDiameter, 'Диаметър', 'diameter')}
                    {renderSelect(brand, setBrand, 'Марка', 'brand')}
                </div>

                <div className="season-selection">
                    <button type="button" className={`season-button ${season === 'Всесезонни' ? 'active-season' : ''}`} onClick={() => handleSeasonChange('Всесезонни')}>
                        <FiCloudSnow className="season-icon all-season-icon" /> Всесезонни
                    </button>
                    <button type="button" className={`season-button ${season === 'Зимни' ? 'active-season' : ''}`} onClick={() => handleSeasonChange('Зимни')}>
                        <RiSnowyFill className="season-icon winter-icon" /> Зимни
                    </button>
                    <button type="button" className={`season-button ${season === 'Летни' ? 'active-season' : ''}`} onClick={() => handleSeasonChange('Летни')}>
                        <RiSunFill className="season-icon summer-icon" /> Летни
                    </button>
                </div>

                <div className="search-buttons-group">
                    <button type="submit" className="search-button-new">ТЪРСЕНЕ</button>
                    <button type="button" className="reset-button-new" onClick={resetSearch}>ПОКАЖИ ВСИЧКИ</button>
                </div>
            </form>

            <div className="tire-list">
                {displayedTires.length === 0 ? (
                    <p className="no-tires-message">Няма налични гуми, отговарящи на Вашите критерии.</p>
                ) : (
                    <div className="tire-grid">
                        {displayedTires.map(tire => (
                            <div key={tire._id} className="tire-card">
                                <div className="tire-image-wrapper">
                                    <img
                                        src={tire.images && tire.images.length > 0 ? tire.images[0] : '/placeholder.png'}
                                        alt={`${tire.brand || ''} ${tire.model || ''}`}
                                        className="tire-image"
                                    />
                                </div>
                                <div className="tire-info-details">
                                    <p className="tire-subtitle">{tire.brand || 'Марка'} | {tire.model || 'Модел'}</p>
                                    <p className="tire-size-season">
                                        {tire.width}/{tire.aspectRatio}R{tire.diameter} | {tire.season}
                                        {tire.season === 'Всесезонни' && <FiCloudSnow className="season-icon-inline all-season-icon-inline" />}
                                        {tire.season === 'Зимни' && <RiSnowyFill className="season-icon-inline winter-icon-inline" />}
                                        {tire.season === 'Летни' && <RiSunFill className="season-icon-inline summer-icon-inline" />}
                                    </p>
                                    <div className="tire-price-row">
                                        <span className="tire-price-bgn"><strong>{Number(tire.price).toFixed(2)} лв.</strong></span>
                                        <span className="tire-price-eur">/ {(Number(tire.price) / 1.95583).toFixed(2)} &euro; <small className="price-vat">с ддс</small></span>
                                    </div>
                                    <div className="tire-card-actions">
                                        <button className="view-details-button" onClick={(e) => { e.stopPropagation(); navigate(`/tire/${tire._id}`) }}>ВИЖТЕ ПОВЕЧЕ</button>
                                        <button className="buy-button" onClick={(e) => { e.stopPropagation(); handleAddToCart(tire) }}>
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