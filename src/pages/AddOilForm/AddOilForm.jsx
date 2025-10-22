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
        const selected = Array.from(e.target.files);
        if (selected.length + images.length > 3) {
            setNotification({ type: "error", message: "Можете да качите максимум 3 изображения!" });
            return;
        }
        setImages((prev) => [...prev, ...selected]);
    };

    const handleRemoveImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!vehicleType || !oilCategory || !brand || !viscosity || !oilType || !volume || !price || images.length === 0) {
            setNotification({ type: "error", message: "Моля, попълнете всички полета и добавете поне едно изображение!" });
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
        images.forEach((img) => formData.append("images", img));

        try {
            const response = await axios.post("http://localhost:5000/api/oils/add-oil", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201) {
                setNotification({ type: "success", message: "Маслото беше добавено успешно!" });
                setVehicleType("");
                setOilCategory("");
                setBrand("");
                setViscosity("");
                setOilType("");
                setVolume("");
                setPrice("");
                setImages([]);
                document.querySelector('input[type="file"]').value = null;
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Грешка при добавяне на маслото.";
            setNotification({ type: "error", message: errorMessage });
        }
    };

    return (
        <div className="add-oil-form-container">
            <h2>Добавяне на масло</h2>
            {notification && <div className={`notification ${notification.type}`}>{notification.message}</div>}

            <form onSubmit={handleSubmit} className="add-oil-form">
                <label>Превозно средство:</label>
                <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                    <option value="">Изберете</option>
                    <option value="Автомобили">Автомобили</option>
                    <option value="Камиони">Камиони</option>
                    <option value="Мотори">Мотори</option>
                </select>

                <label>Подкатегория масло:</label>
                <select value={oilCategory} onChange={(e) => setOilCategory(e.target.value)}>
                    <option value="">Изберете</option>
                    {vehicleType && OIL_SUBCATEGORIES[vehicleType].map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                    ))}
                </select>

                <label>Марка:</label>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Напр. Shell"
                />

                <label>Вискозитет:</label>
                <input
                    type="text"
                    value={viscosity}
                    onChange={(e) => setViscosity(e.target.value)}
                    placeholder="Напр. 5W-40"
                />

                <label>Тип масло:</label>
                <select value={oilType} onChange={(e) => setOilType(e.target.value)}>
                    <option value="">Изберете</option>
                    {OIL_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <label>Разфасовка (литри):</label>
                <input
                    type="text"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    placeholder="Напр. 1L"
                />

                <label>Цена (лв):</label>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Напр. 35.50"
                />

                <label>Изображения (до 3):</label>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} />

                {images.length > 0 && (
                    <div className="oil-image-previews">
                        {images.map((file, index) => (
                            <div key={index} className="oil-image-preview">
                                <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} />
                                <button type="button" className="remove-oil-image" onClick={() => handleRemoveImage(index)}>×</button>
                            </div>
                        ))}
                    </div>
                )}

                <button type="submit">Добави масло</button>
            </form>
        </div>
    );
};

export default AddOilForm;