import React, { useState } from "react";
import axios from "axios";
import "./AddMats.css";
import { MATS_SEARCH_OPTIONS } from "../AutoAccessoriesPage/matsData";

function AddMats() {
    const [title, setTitle] = useState("");
    const [material, setMaterial] = useState("");
    const [color, setColor] = useState("");
    const [carBrand, setCarBrand] = useState("");
    const [carModel, setCarModel] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]); 
    const [previews, setPreviews] = useState([]); 
    const [notification, setNotification] = useState(null);

    
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = [...images, ...files].slice(0, 4); 

        setImages(newFiles);
        setPreviews(newFiles.map(file => URL.createObjectURL(file)));
    };

    
    const handleRemoveImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setImages(newImages);
        setPreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !material || !color || !carBrand || !carModel || !price || images.length === 0) {
            setNotification({ type: "error", message: "Попълнете всички полета и добавете поне една снимка!" });
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("material", material);
        formData.append("color", color);
        formData.append("carBrand", carBrand);
        formData.append("carModel", carModel);
        formData.append("description", description);
        formData.append("price", price);
        images.forEach(img => formData.append("images", img));

        try {
            const response = await axios.post("http://localhost:5000/api/mats/add", formData);
            if (response.status === 201) {
                setNotification({ type: "success", message: "Стелката беше добавена успешно!" });
                setTitle(""); setMaterial(""); setColor(""); setCarBrand(""); setCarModel(""); setDescription(""); setPrice("");
                setImages([]); setPreviews([]);
            }
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || "Грешка при добавянето на стелката.";
            setNotification({ type: "error", message: msg });
        }
    };

    return (
        <div className="mats-form-wrapper">
            <h2>Добави нови стелки</h2>
            {notification && <div className={`mats-notification ${notification.type}`}>{notification.message}</div>}

            <form onSubmit={handleSubmit} className="add-mats-form-body">
                <label className="mats-label">Заглавие:</label>
                <input className="mats-input" value={title} onChange={e => setTitle(e.target.value)} required />

                <label className="mats-label">Материал:</label>
                <select className="mats-select" value={material} onChange={e => setMaterial(e.target.value)} required>
                    <option value="">Избери</option>
                    <option value="Мокетни">Мокетни</option>
                    <option value="Гумени">Гумени</option>
                    <option value="Универсални">Универсални</option>
                </select>

                <label className="mats-label">Цвят:</label>
                <input className="mats-input" value={color} onChange={e => setColor(e.target.value)} required />

                <label className="mats-label">Марка автомобил:</label>
                <select
                    className="mats-select"
                    value={carBrand}
                    onChange={(e) => {
                        setCarBrand(e.target.value);
                        setCarModel("");
                    }}
                    required
                >
                    <option value="">Избери</option>
                    {Object.keys(MATS_SEARCH_OPTIONS['Марки']).map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>

                <label className="mats-label">Модел автомобил:</label>
                <select
                    className="mats-select"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    required
                    disabled={!carBrand}
                >
                    <option value="">Избери</option>
                    {carBrand && MATS_SEARCH_OPTIONS['Марки'][carBrand]?.map((model) => (
                        <option key={model} value={model}>{model}</option>
                    ))}
                </select>

                <label className="mats-label">Описание:</label>
                <textarea className="mats-textarea" value={description} onChange={e => setDescription(e.target.value)} />

                <label className="mats-label">Цена (лв):</label>
                <input className="mats-input" type="number" value={price} onChange={e => setPrice(e.target.value)} required />

                <label className="mats-label">Снимки (до 4):</label>
                <input className="mats-file-input" type="file" multiple accept="image/*" onChange={handleImageChange} />

                
                <div className="mats-preview-container">
                    {previews.map((src, idx) => (
                        <div key={idx} className="mats-preview-item">
                            <img src={src} alt={`preview-${idx}`} className="mats-preview-img" />
                            <button type="button" className="mats-remove-btn" onClick={() => handleRemoveImage(idx)}>&times;</button>
                        </div>
                    ))}
                </div>

                <button type="submit" className="mats-submit-btn">Добави стелка</button>
            </form>
        </div>
    );
}

export default AddMats;