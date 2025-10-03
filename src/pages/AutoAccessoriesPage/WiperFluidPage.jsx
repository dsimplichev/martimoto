import React, { useState } from 'react';
import SectionHeader from '../../Card/SectionHeader';
import './WiperFluidPage.css';

// Примерни опции за падащите менюта
const MANUFACTURERS = ["Shell", "Castrol", "Total", "Liqui Moly"];
const PACKINGS = ["1L", "5L", "10L"];

function WiperFluidPage() {
    const [manufacturer, setManufacturer] = useState('Избери Производител');
    const [packing, setPacking] = useState('Избери Разфасовка');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Търсене на течност за чистачки:", { manufacturer, packing });
        // Тук можеш да добавиш fetch към бекенда
    };

    return (
        <div className="wiper-fluid-page-container">
            <SectionHeader title="ТЕЧНОСТ ЗА ЧИСТАЧКИ" />

            {/* Търсачка */}
            <form onSubmit={handleSearch} className="search-form-new">
                <div className="select-group main-params-new">
                    {/* Производител */}
                    <div className="select-wrapper">
                        <select
                            value={manufacturer}
                            onChange={(e) => setManufacturer(e.target.value)}
                            className="select-param"
                        >
                            <option value="Избери Производител" disabled>Производител</option>
                            {MANUFACTURERS.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    
                    <div className="select-wrapper">
                        <select
                            value={packing}
                            onChange={(e) => setPacking(e.target.value)}
                            className="select-param"
                        >
                            <option value="Избери Разфасовка" disabled>Разфасовка</option>
                            {PACKINGS.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="search-button-new">ТЪРСИ</button>
            </form>

            <div className="fluid-content">
                <p>Няма добавени артикули...</p>
            </div>
        </div>
    );
}

export default WiperFluidPage;