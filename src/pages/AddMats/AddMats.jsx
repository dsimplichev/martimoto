import React, { useState, useMemo } from "react";
import axios from "axios";
import "./AddMats.css";
import { MATS_SEARCH_OPTIONS } from "../AutoAccessoriesPage/matsData";

function AddMats() {
    const [title, setTitle] = useState("");
    const [material, setMaterial] = useState("");
    const [color, setColor] = useState("");
    const [carBrand, setCarBrand] = useState("");
    const [carModel, setCarModel] = useState("");
    const [carYear, setCarYear] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const [notification, setNotification] = useState(null);

    const availableBrands = Object.keys(MATS_SEARCH_OPTIONS['Марки']);
    const availableModels = useMemo(() => MATS_SEARCH_OPTIONS['Марки'][carBrand] || [], [carBrand]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 4) {
            setNotification({ type: "error", message: "Макс. 4 снимки!" });
            return;
        }
        setImages(prev => [...prev, ...files]);
    };

    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !material || !color || !carBrand || !carModel || !price || images.length === 0) {
            setNotification({ type: "error", message: "Попълнете всички задължителни полета и качете поне 1 снимка!" });
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("material", material);
        formData.append("color", color);
        formData.append("carBrand", carBrand);
        formData.append("carModel", carModel);
        formData.append("carYear", carYear);
        formData.append("description", description);
        formData.append("price", price);
        images.forEach(img => formData.append("images", img));

        try {
            const response = await axios.post("http://localhost:5000/api/mats/add", formData);
            setNotification({ type: "success", message: "Стелката е добавена успешно!" });
            setTitle(""); setMaterial(""); setColor(""); setCarBrand(""); setCarModel(""); setCarYear(""); setDescription(""); setPrice("");
            setImages([]);
            document.getElementById('mats-images').value = null;
        } catch (error) {
            const msg = error.response?.data?.message || "Грешка при добавяне.";
            setNotification({ type: "error", message: msg });
        }
    };

    return (
        <div className="add-mats-container">
            <h2>Добави стелки</h2>

            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="add-mats-form">
                
                <div className="form-row">
                    <div className="form-group">
                        <label>Заглавие</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="напр. 3D стелки BMW" required />
                    </div>
                    <div className="form-group">
                        <label>Материал</label>
                        <select value={material} onChange={(e) => setMaterial(e.target.value)} required>
                            <option value="">Избери</option>
                            {MATS_SEARCH_OPTIONS['Материал'].map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                </div>

                
                <div className="form-row">
                    <div className="form-group">
                        <label>Цвят</label>
                        <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="напр. Черен" required />
                    </div>
                    <div className="form-group">
                        <label>Марка</label>
                        <select
                            value={carBrand}
                            onChange={(e) => { setCarBrand(e.target.value); setCarModel(""); }}
                            required
                        >
                            <option value="">Избери</option>
                            {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                </div>

                
                <div className="form-row">
                    <div className="form-group">
                        <label>Модел</label>
                        <select
                            value={carModel}
                            onChange={(e) => setCarModel(e.target.value)}
                            disabled={!carBrand}
                            required
                        >
                            <option value="">Избери</option>
                            {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Година</label>
                        <input value={carYear} onChange={(e) => setCarYear(e.target.value)} placeholder="напр. 2018-2023" />
                    </div>
                </div>

                
                <div className="form-row">
                    <div className="form-group full">
                        <label>Описание</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Подробно описание..."
                            rows="3"
                        />
                    </div>
                </div>

                
                <div className="form-row">
                    <div className="form-group">
                        <label>Цена (лв.)</label>
                        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="129.90" required />
                    </div>
                </div>

                
                <div className="form-group full">
                    <label>Снимки (до 4)</label>
                    <label htmlFor="mats-images" className="upload-btn">
                        Качи снимки
                    </label>
                    <input
                        id="mats-images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="file-input"
                    />
                    <div className="image-previews">
                        {images.map((file, i) => (
                            <div key={i} className="preview-item">
                                <img src={URL.createObjectURL(file)} alt={`Preview ${i + 1}`} />
                                <button type="button" onClick={() => handleRemoveImage(i)} className="remove-btn">
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="submit-btn">Добави стелка</button>
            </form>
        </div>
    );
}

export default AddMats;