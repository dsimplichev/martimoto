import React, { useState, useContext } from 'react';
import axios from 'axios';
import './AddCarTiresPage.css';
import { AuthContext } from '../../Context/AuthContext';

function AddCarTiresPage() {
    const { user, isLoggedIn } = useContext(AuthContext);

    const [tireData, setTireData] = useState({
        tireType: 'Автомобилни гуми',
        brand: '',
        model: '',
        width: '',
        aspectRatio: '',
        diameter: '',
        loadIndex: '',
        speedRating: '',
        fuelEconomy: '',
        wetGrip: '',
        noiseLevel: '',
        season: 'Летни',
        price: '',
        description: '',
        images: [],
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    if (!isLoggedIn || user.role !== 'admin') {
        return <p className="access-denied">Нямате права за достъп.</p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const val = ['width', 'aspectRatio', 'noiseLevel', 'price'].includes(name) ? Number(value) : value;
        setTireData(prev => ({ ...prev, [name]: val }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (tireData.images.length + files.length > 5) {
            setError('Макс. 5 снимки!');
            return;
        }
        setTireData(prev => ({ ...prev, images: [...prev.images, ...files] }));
        setError('');
    };

    const handleRemoveImage = (index) => {
        setTireData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!tireData.brand) {
            setError('Марката е задължителна!');
            return;
        }
        if (tireData.images.length === 0) {
            setError('Качете поне една снимка!');
            return;
        }

        const formData = new FormData();
        for (const key in tireData) {
            if (key !== 'images') formData.append(key, tireData[key]);
        }
        tireData.images.forEach(img => formData.append('images', img));

        try {
            const response = await axios.post('http://localhost:5000/api/add-car-tire', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            setMessage(`Гумата е добавена успешно! ID: ${response.data.newTire._id}`);
            setTireData({
                tireType: 'Автомобилни гуми',
                brand: '', model: '', width: '', aspectRatio: '', diameter: '',
                loadIndex: '', speedRating: '', fuelEconomy: '', wetGrip: '',
                noiseLevel: '', season: 'Летни', price: '', description: '', images: [],
            });
            document.getElementById('tire-image').value = null;
        } catch (err) {
            const errMsg = err.response?.data?.message || 'Неуспешна връзка със сървъра.';
            setError('Грешка: ' + errMsg);
        }
    };

    const seasons = ['Летни', 'Зимни', 'Всесезонни'];

    return (
        <div className="add-tire-container">
            <h1>Добавяне на Авто Гуми</h1>

            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="add-tire-form">
                
                <div className="form-row">
                    <div className="form-group">
                        <label>Марка</label>
                        <input
                            type="text" name="brand" placeholder="напр. Michelin"
                            value={tireData.brand} onChange={handleChange} required
                        />
                    </div>
                    <div className="form-group">
                        <label>Модел</label>
                        <input
                            type="text" name="model" placeholder="напр. Pilot Sport 4"
                            value={tireData.model} onChange={handleChange}
                        />
                    </div>
                </div>

                
                <div className="form-row size-row">
                    <div className="form-group">
                        <label>Ширина</label>
                        <input type="number" name="width" placeholder="205" value={tireData.width} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Профил</label>
                        <input type="number" name="aspectRatio" placeholder="55" value={tireData.aspectRatio} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Диаметър</label>
                        <input type="text" name="diameter" placeholder="R16" value={tireData.diameter} onChange={handleChange} required />
                    </div>
                </div>

                
                <div className="form-row">
                    <div className="form-group">
                        <label>Товарен индекс</label>
                        <input type="text" name="loadIndex" placeholder="91" value={tireData.loadIndex} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Скоростен индекс</label>
                        <input type="text" name="speedRating" placeholder="V" value={tireData.speedRating} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Икономия</label>
                        <input type="text" name="fuelEconomy" placeholder="A" value={tireData.fuelEconomy} onChange={handleChange} required />
                    </div>
                </div>

                
                <div className="form-row">
                    <div className="form-group">
                        <label>Сцепление на мокро</label>
                        <input type="text" name="wetGrip" placeholder="B" value={tireData.wetGrip} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Шум (dB)</label>
                        <input type="number" name="noiseLevel" placeholder="72" value={tireData.noiseLevel} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Сезон</label>
                        <select name="season" value={tireData.season} onChange={handleChange} required>
                            {seasons.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                
                <div className="form-row">
                    <div className="form-group">
                        <label>Цена (лв.)</label>
                        <input
                            type="number" name="price" placeholder="189.90"
                            value={tireData.price} onChange={handleChange} step="0.01" required
                        />
                    </div>
                </div>

                
                <div className="form-group">
                    <label>Описание</label>
                    <textarea
                        name="description" placeholder="Подробно описание..."
                        value={tireData.description} onChange={handleChange} rows="4"
                    />
                </div>

                
                <div className="form-group">
                    <label>Снимки (до 5)</label>
                    <label htmlFor="tire-image" className="upload-btn">
                        Качи снимки
                    </label>
                    <input
                        id="tire-image"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="file-input"
                    />
                    <div className="image-previews">
                        {tireData.images.map((file, i) => (
                            <div key={i} className="preview-item">
                                <img src={URL.createObjectURL(file)} alt={`Preview ${i + 1}`} />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(i)}
                                    className="remove-btn"
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="submit-btn">Добави Гума</button>
            </form>
        </div>
    );
}

export default AddCarTiresPage;