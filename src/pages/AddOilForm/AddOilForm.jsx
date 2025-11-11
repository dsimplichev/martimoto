import React, { useState } from "react";
import axios from "axios";
import "./AddOilForm.css";

const OIL_SUBCATEGORIES = {
    Автомобили: ["Двигателно масло", "Скоростна кутия", "Хидравлично масло"],
    Камиони: ["Двигателно масло", "Скоростна кутия", "Хидравлично масло"],
    Мотори: ["Двигателно масло", "Масло за скорости", "Масло за вилка"],
};

const OIL_TYPES = ["Синтетично", "Минерално", "Полусинтетично"];

const AddOilForm = () => {
    const [vehicleType, setVehicleType] = useState("");
    const [oilCategory, setOilCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [viscosity, setViscosity] = useState("");
    const [oilType, setOilType] = useState("");
    const [volume, setVolume] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const [notification, setNotification] = useState(null);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 3) {
            setNotification({ type: "error", message: "Макс. 3 снимки!" });
            return;
        }
        setImages(prev => [...prev, ...files]);
    };

    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!vehicleType || !oilCategory || !brand || !viscosity || !oilType || !volume || !price || images.length === 0) {
            setNotification({ type: "error", message: "Попълнете всички полета и качете поне 1 снимка!" });
            return;
        }

        const formData = new FormData();
        formData.append("vehicleType", vehicleType);
        formData.append("oilCategory", oilCategory);
        formData.append("brand", brand);
        formData.append("viscosity", viscosity);
        formData.append("type", oilType);
        formData.append("volume", volume);
        formData.append("price", price);
        images.forEach(img => formData.append("images", img));

        try {
            const response = await axios.post("http://localhost:5000/api/oils/add-oil", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setNotification({ type: "success", message: "Маслото е добавено успешно!" });
            setVehicleType("");
            setOilCategory("");
            setBrand("");
            setViscosity("");
            setOilType("");
            setVolume("");
            setPrice("");
            setImages([]);
            document.getElementById('oil-images').value = null;
        } catch (error) {
            const msg = error.response?.data?.message || "Грешка при добавяне.";
            setNotification({ type: "error", message: msg });
        }
    };

    return (
        <div className="add-oil-container">
            <h2>Добавяне на масло</h2>

            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="add-oil-form">
                
                <div className="form-group">
                    <label>Превозно средство</label>
                    <select value={vehicleType} onChange={(e) => { setVehicleType(e.target.value); setOilCategory(""); }} required>
                        <option value="">Избери</option>
                        {Object.keys(OIL_SUBCATEGORIES).map(v => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>
                </div>

                
                {vehicleType && (
                    <div className="form-group">
                        <label>Тип масло</label>
                        <select value={oilCategory} onChange={(e) => setOilCategory(e.target.value)} required>
                            <option value="">Избери</option>
                            {OIL_SUBCATEGORIES[vehicleType].map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>
                )}

                
                <div className="form-group">
                    <label>Марка</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="напр. Shell"
                        required
                    />
                </div>

                
                <div className="form-group">
                    <label>Вискозитет</label>
                    <input
                        type="text"
                        value={viscosity}
                        onChange={(e) => setViscosity(e.target.value)}
                        placeholder="напр. 5W-40"
                        required
                    />
                </div>

                
                <div className="form-group">
                    <label>Тип</label>
                    <select value={oilType} onChange={(e) => setOilType(e.target.value)} required>
                        <option value="">Избери</option>
                        {OIL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

               
                <div className="form-group">
                    <label>Разфасовка (литри)</label>
                    <input
                        type="text"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        placeholder="напр. 1L, 4L"
                        required
                    />
                </div>

                
                <div className="form-group">
                    <label>Цена (лв.)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="35.50"
                        required
                    />
                </div>

               
                <div className="form-group">
                    <label>Снимки (до 3)</label>
                    <label htmlFor="oil-images" className="upload-btn">
                        Качи снимки
                    </label>
                    <input
                        id="oil-images"
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

                <button type="submit" className="submit-btn">Добави масло</button>
            </form>
        </div>
    );
};

export default AddOilForm;