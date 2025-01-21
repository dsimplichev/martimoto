import { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext'; 
import { brands } from './data'; 
import "./addpart.css";

function AddPart() {
    const { user, isLoggedIn } = useContext(AuthContext); 
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [cylinder, setCylinder] = useState('');
    const [year, setYear] = useState('');
    const [partName, setPartName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const [availableModels, setAvailableModels] = useState([]);
    const [availableCylinders, setAvailableCylinders] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);

    const handleBrandChange = (e) => {
        const selectedBrand = e.target.value;
        setBrand(selectedBrand);
        setModel('');
        setCylinder('');
        setYear('');
        setAvailableModels(brands[selectedBrand]?.models || []);
        setAvailableCylinders([]); 
        setAvailableYears([]); 
    };

    const handleModelChange = (e) => {
        const selectedModel = e.target.value;
        setModel(selectedModel);
        setCylinder('');
        setYear('');
        
        
        const cylinders = brands[brand]?.cylinderOptions?.[selectedModel] || [];
        setAvailableCylinders(cylinders);

        const years = brands[brand]?.years?.[selectedModel] || [];
        setAvailableYears(years);
    };

    const handleCylinderChange = (e) => {
        const selectedCylinder = e.target.value;
        setCylinder(selectedCylinder);
        setYear('');
        const yearsForCylinder = brands[brand]?.years?.[model]?.[selectedCylinder] || [];
        setAvailableYears(yearsForCylinder);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if (!brand || !model || !partName || !description || !price) {
            setMessage("Моля, попълнете всички полета!");
            return;
        }

        setMessage("Частта е добавена успешно!");
    };

    
    if (!isLoggedIn || user.role !== 'admin') {
        return <p>Нямате права да достъпвате тази страница.</p>; 
    }

    return (
        <div>
            <h2>Добави част</h2>
            <form className="add-part-form" onSubmit={handleSubmit}>
                <div>
                    <label>Марка</label>
                    <select value={brand} onChange={handleBrandChange}>
                        <option value="">Изберете марка</option>
                        <option value="BMW">BMW</option>
                        <option value="Ducati">Ducati</option>
                        <option value="Suzuki">Suzuki</option>
                    </select>
                </div>

                {brand && (
                    <div>
                        <label>Модел</label>
                        <select value={model} onChange={handleModelChange}>
                            <option value="">Изберете модел</option>
                            {availableModels.map((modelName) => (
                                <option key={modelName} value={modelName}>
                                    {modelName}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {model && (
                    <div>
                        <label>Кубатура</label>
                        <select value={cylinder} onChange={handleCylinderChange}>
                            <option value="">Изберете кубатура</option>
                            {availableCylinders.map((cylinderOption) => (
                                <option key={cylinderOption} value={cylinderOption}>
                                    {cylinderOption}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {cylinder && (
                    <div>
                        <label>Година</label>
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="">Изберете година</option>
                            {availableYears.map((yearOption) => (
                                <option key={yearOption} value={yearOption}>
                                    {yearOption}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div>
                    <label>Име на частта</label>
                    <input
                        type="text"
                        value={partName}
                        onChange={(e) => setPartName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Описание</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Цена</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Добави частта</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default AddPart;