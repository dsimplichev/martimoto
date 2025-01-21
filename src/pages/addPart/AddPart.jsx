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
    const [availableYears, setAvailableYears] = useState([]);

    const handleBrandChange = (e) => {
        const selectedBrand = e.target.value;
        setBrand(selectedBrand);
        setModel('');
        setCylinder('');
        setYear('');
        setAvailableModels(brands[selectedBrand]?.models || []);
        setAvailableYears([]); 
    };

    const handleModelChange = (e) => {
        const selectedModel = e.target.value;
        setModel(selectedModel);
        setYear('');
        setAvailableYears(brands[brand]?.years[selectedModel] || []);
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
                        <label>Година</label>
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="">Изберете година</option>
                            {availableYears.map((yearRange) => (
                                <option key={yearRange} value={yearRange}>
                                    {yearRange}
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
                    />
                </div>

                <div>
                    <label>Описание</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label>Цена</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <button type="submit">Добави част в количка</button>
            </form>

            {message && <p className={message.includes('успешно') ? 'message' : 'message error'}>{message}</p>}
        </div>
    );
}

export default AddPart;