import { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { brands } from './data';
import axios from 'axios';
import "./addpart.css";

function AddPart() {
    const { user, isLoggedIn } = useContext(AuthContext);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);
    const [availableModels, setAvailableModels] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);
    const [formVisible, setFormVisible] = useState(true);

    const handleBrandChange = (e) => {
        const selectedBrand = e.target.value;
        setBrand(selectedBrand);
        setModel('');
        setYear('');
        setAvailableModels(brands[selectedBrand]?.models || []);
        setAvailableYears([]);
    };

    const handleModelChange = (e) => {
        const selectedModel = e.target.value;
        setModel(selectedModel);
        setYear('');
        const years = brands[brand]?.years?.[selectedModel] || [];
        setAvailableYears(years);
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
        formData.append('year', year);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        images.forEach((image) => formData.append('images', image));

        try {
            const response = await axios.post('http://localhost:5000/api/parts/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMessage('Частта е добавена успешно!');
            setFormVisible(false);
        } catch (error) {
            console.error('Грешка:', error);
            setMessage('Грешка при добавяне на част!');
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 4) {
            alert('Макс. 4 снимки!');
            return;
        }
        setImages([...images, ...files]);
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    if (!isLoggedIn || user.role !== 'admin') {
        return <p className="access-denied">Нямате права за достъп.</p>;
    }

    return (
        <div className="add-part-container">
            {formVisible ? (
                <form className="add-part-form" onSubmit={handleSubmit}>
                    <h2>Добави част</h2>

                    
                    <div className="form-group">
                        <label>Марка</label>
                        <select value={brand} onChange={handleBrandChange} required>
                            <option value="">Избери марка</option>
                            {Object.keys(brands).map(b => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>
                    </div>

                    
                    {brand && (
                        <div className="form-group">
                            <label>Модел</label>
                            <select value={model} onChange={handleModelChange} required>
                                <option value="">Избери модел</option>
                                {availableModels.map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    
                    {model && availableYears.length > 0 && (
                        <div className="form-group">
                            <label>Година</label>
                            <select value={year} onChange={(e) => setYear(e.target.value)}>
                                <option value="">Избери година</option>
                                {availableYears.map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    
                    <div className="form-group">
                        <label>Име на частта</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="напр. Ауспух Akrapovic"
                            required
                        />
                    </div>

                    
                    <div className="form-group">
                        <label>Описание</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            placeholder="Кратко описание на частта..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Цена (лв.)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min="0"
                            step="0.01"
                            placeholder="150.00"
                            required
                        />
                    </div>

                    
                    <div className="form-group">
                        <label>Снимки (макс. 4)</label>
                        <label htmlFor="image-upload" className="upload-btn">
                            <i className="fas fa-cloud-upload-alt"></i> Качи снимки
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="file-input"
                        />
                        <div className="image-previews">
                            {images.map((img, i) => (
                                <div key={i} className="preview-item">
                                    <img src={URL.createObjectURL(img)} alt={`Preview ${i}`} />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(i)}
                                        className="remove-btn"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        Добави частта
                    </button>
                </form>
            ) : (
                <div className="success-message">
                    <i className="fas fa-check-circle"></i>
                    <p>{message}</p>
                    <button onClick={() => window.location.reload()} className="reset-btn">
                        Добави още
                    </button>
                </div>
            )}

            {message && formVisible && (
                <p className={`message ${message.includes('Грешка') ? 'error' : ''}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default AddPart;