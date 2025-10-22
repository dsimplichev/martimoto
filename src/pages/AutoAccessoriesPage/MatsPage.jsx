import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../../Card/SectionHeader';
import './MatsPage.css';
import { MATS_SEARCH_OPTIONS } from '../AutoAccessoriesPage/matsData';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../../Context/CartContext';

function MatsPage() {
    const [brand, setBrand] = useState('Избери Марка');
    const [model, setModel] = useState('Избери Модел');
    const [material, setMaterial] = useState('Избери Материал');
    const [mats, setMats] = useState([]);
    const [filteredMats, setFilteredMats] = useState([]);
    const [notification, setNotification] = useState("");

    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

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

    const handleBuyClick = (mat) => {
        const item = {
            _id: mat._id,
            title: mat.title,
            price: Number(mat.price),
            quantity: 1,
            image: mat.images?.[0] || 'https://placehold.co/400x300?text=No+Image',
            itemType: "mat",
        };

        addToCart(item);
        setNotification(`Продукт "${mat.title}" беше добавен в количката.`);
    };

    const handleDetailsClick = (matId) => {
        navigate(`/mats/${matId}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (brand === 'Избери Марка' || model === 'Избери Модел') {
            alert('Моля, изберете Марка и Модел.');
            return;
        }

        const results = mats.filter(
            (mat) =>
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
                {notification && <div className="cart-notification-center">{notification}</div>}
                <select
                    value={stateValue}
                    onChange={(e) => setStateFunction(e.target.value)}
                    className="select-param"
                    disabled={key === 'Модел' && brand === 'Избери Марка'}
                >
                    <option value={`Избери ${label}`} disabled>
                        {label.toUpperCase()}
                    </option>
                    {options.map((v) => (
                        <option key={v} value={v}>
                            {v}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    return (
        <div className="mats-page-container">
            <SectionHeader title="СТЕЛКИ" />

            <form onSubmit={handleSearch} className="search-form-new mats-search-form">
                {renderSelect(brand, setBrand, 'Марка', brandOptions)}
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
                        {filteredMats.map((mat) => (
                            <div key={mat._id} className="mat-card">
                                <img
                                    src={mat.images[0] || 'https://placehold.co/400x300?text=No+Image'}
                                    alt={mat.title}
                                    className="mat-image"
                                />
                                <h3 title={mat.title}>{mat.title}</h3>
                                <p><strong>Марка:</strong> {mat.carBrand}</p>
                                <p><strong>Модел:</strong> {mat.carModel}</p>
                                <p><strong>Материал:</strong> {mat.material}</p>

                                <div className="mats-price-row">
                                    <span className="mats-price-bgn">
                                        <strong>{Number(mat.price).toFixed(2)} лв.</strong>
                                    </span>
                                    <span className="mats-price-eur">
                                        / {(Number(mat.price) / 1.95583).toFixed(2)} €
                                    </span>
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