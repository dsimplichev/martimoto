import { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { brands } from './data';
import axios from 'axios';
import "./addpart.css";

function AddPart() {
    const { user, isLoggedIn } = useContext(AuthContext);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [cylinder, setCylinder] = useState('');
    const [year, setYear] = useState('');
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);
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
        let years = [];
        if (Array.isArray(brands[brand]?.years?.[selectedModel])) {
            years = brands[brand]?.years?.[selectedModel] || [];
        } else {
            years = brands[brand]?.years?.[selectedModel]?.[cylinder] || [];
        }
        setAvailableYears(years);
    };

    const handleCylinderChange = (e) => {
        const selectedCylinder = e.target.value;
        setCylinder(selectedCylinder);
        setYear('');
        let yearsForCylinder = [];
        if (Array.isArray(brands[brand]?.years?.[model])) {
            yearsForCylinder = brands[brand]?.years?.[model] || [];
        } else {
            yearsForCylinder = brands[brand]?.years?.[model]?.[selectedCylinder] || [];
        }
        setAvailableYears(yearsForCylinder);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!brand || !model || !title || !description || !price || images.length === 0) {
            setMessage("Моля, попълнете всички полета и качете поне едно изображение!");
            return;
        }

        const formData = new FormData();
        formData.append('brand', brand);
        formData.append('model', model);
        formData.append('cylinder', cylinder);
        formData.append('year', year);
        formData.append('title', title); 
        formData.append('description', description);
        formData.append('price', price);
        images.forEach((image) => {
            formData.append('images', image);  
        });

        try {
            const response = await axios.post('http://localhost:5000/api/parts/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Частта е добавена успешно!');
            console.log('Частта е добавена успешно:', response.data);
        } catch (error) {
            console.error('Грешка при добавяне на част:', error);
            setMessage('Грешка при добавяне на част!');
        }
    };

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + images.length <= 4) {
            setImages([...images, ...selectedFiles]);
        } else {
            alert('Можете да качите максимум 4 снимки!');
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
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
                        <option value="Kawasaki">KAWASAKI</option>
                        <option value="Honda">Honda</option>
                        <option value="Yamaha">Yamaha</option>
                        <option value="Aprilia">Aprilia</option>
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

                {model && availableCylinders.length > 0 && (
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

                {availableYears.length > 0 && (
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
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
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

                <div>
                    <label htmlFor="image-upload" className="upload-label">
                        <i className="fas fa-upload"></i> Добави изображения
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="upload-button"
                        onChange={handleImageChange}
                        multiple
                    />
                    <div className="image-previews">
                        {images.map((image, index) => (
                            <div key={index} className="image-preview">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded ${index}`}
                                    style={{ width: '100px', marginTop: '10px' }}
                                />
                                <button type="button" onClick={() => handleRemoveImage(index)}>Изтрий</button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit">Добави частта</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default AddPart;
