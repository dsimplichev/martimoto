import React, { useState, useContext } from 'react';
import axios from 'axios';
import './AddCarTiresPage.css';
import { AuthContext } from '../../Context/AuthContext';

function AddCarTiresPage() {
    const { user, isLoggedIn } = useContext(AuthContext);

    const [tireData, setTireData] = useState({
        tireType: 'Автомобилни гуми', // ново поле
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
        return <p className="error-message">Нямате права да достъпвате тази страница.</p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const val = ['width', 'aspectRatio', 'noiseLevel', 'price'].includes(name) ? Number(value) : value;
        setTireData(prev => ({ ...prev, [name]: val }));
    };

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 5) {
            setError('Можете да качите максимум 5 снимки!');
            e.target.value = null;
            return;
        }
        setTireData(prev => ({ ...prev, images: selectedFiles }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!tireData.brand) {
            setError('Марка е задължителна!');
            return;
        }
        if (tireData.images.length === 0) {
            setError('Моля, качете поне една снимка на гумата.');
            return;
        }

        const formData = new FormData();
        for (const key in tireData) {
            if (key !== 'images') formData.append(key, tireData[key]);
        }
        tireData.images.forEach((image) => formData.append('images', image));

        try {
            const response = await axios.post('http://localhost:5000/api/add-car-tire', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            setMessage('Гумата беше успешно добавена! ID: ' + response.data.newTire._id);

            setTireData({
                tireType: 'Автомобилни гуми',
                brand: '', model: '', width: '', aspectRatio: '', diameter: '', 
                loadIndex: '', speedRating: '', fuelEconomy: '', wetGrip: '', 
                noiseLevel: '', season: 'Летни', price: '', description: '', 
                images: [],
            });
            document.getElementById('tire-image').value = null;

        } catch (err) {
            console.error('Грешка при добавяне на гума:', err);
            const errorMessage = err.response?.data?.message || 'Неуспешна връзка със сървъра или невалидни данни.';
            setError('Грешка при добавяне на гума: ' + errorMessage);
        }
    };

    const seasons = ['Летни', 'Зимни', 'Всесезонни'];
   

    return (
        <div className="add-tire-page-container">
            <h1>Добавяне на Авто Гуми</h1>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="add-tire-form">
                <div className="form-row">
                    

                    <input 
                        type="text" name="brand" placeholder="Марка (напр. Michelin)" 
                        value={tireData.brand} onChange={handleChange} required 
                    />
                    <input 
                        type="text" name="model" placeholder="Модел (напр. Pilot Sport 4)" 
                        value={tireData.model} onChange={handleChange} 
                    />
                </div>

                <div className="form-row size-inputs">
                    <input type="number" name="width" placeholder="Ширина (напр. 205)" 
                        value={tireData.width} onChange={handleChange} required />
                    <input type="number" name="aspectRatio" placeholder="Профил (напр. 55)" 
                        value={tireData.aspectRatio} onChange={handleChange} required />
                    <input type="text" name="diameter" placeholder="Диаметър (напр. R16)" 
                        value={tireData.diameter} onChange={handleChange} required />
                </div>

                <div className="form-row">
                    <input type="text" name="loadIndex" placeholder="Товарен индекс (напр. 91)" 
                        value={tireData.loadIndex} onChange={handleChange} required />
                    <input type="text" name="speedRating" placeholder="Скоростен индекс (напр. V)" 
                        value={tireData.speedRating} onChange={handleChange} required />
                    <input type="text" name="fuelEconomy" placeholder="Икономичен индекс (напр. A)" 
                        value={tireData.fuelEconomy} onChange={handleChange} required />
                </div>

                <div className="form-row">
                    <input type="text" name="wetGrip" placeholder="Сцепление на мокро (напр. B)" 
                        value={tireData.wetGrip} onChange={handleChange} required />
                    <input type="number" name="noiseLevel" placeholder="Индекс шум (напр. 72)" 
                        value={tireData.noiseLevel} onChange={handleChange} required />
                    <select name="season" value={tireData.season} onChange={handleChange} required>
                        {seasons.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <div className="form-row price-row">
                    <input type="number" name="price" placeholder="Цена (в лв.)" 
                        value={tireData.price} onChange={handleChange} step="0.01" required />
                </div>

                <textarea name="description" placeholder="Подробно описание на гумата"
                    value={tireData.description} onChange={handleChange} rows="4" />

                <div className="file-input-wrapper">
                    <label htmlFor="tire-image">Снимки на гумата (до 5 бр.):</label>
                    <input type="file" id="tire-image" name="images" 
                        onChange={handleImageChange} accept="image/*" multiple required />

                    {tireData.images.length > 0 && (
                        <div className="image-previews" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                            {tireData.images.map((file, index) => (
                                <img key={index} src={URL.createObjectURL(file)} 
                                    alt={`Preview ${index + 1}`} 
                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                            ))}
                        </div>
                    )}
                </div>

                <button type="submit" className="submit-tire-btn">Добави Гума</button>
            </form>
        </div>
    );
}

export default AddCarTiresPage;