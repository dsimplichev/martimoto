import React, { useState } from "react";
import axios from "axios";
import "./AddMats.css";

function AddMats() {
    const [title, setTitle] = useState("");
    const [material, setMaterial] = useState("");
    const [color, setColor] = useState("");
    const [carBrand, setCarBrand] = useState("");
    const [carModel, setCarModel] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const [notification, setNotification] = useState(null);

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
                setTitle(""); setMaterial(""); setColor(""); setCarBrand(""); setCarModel(""); setDescription(""); setPrice(""); setImages([]);
            }
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || "Грешка при добавянето на стелката.";
            setNotification({ type: "error", message: msg });
        }
    };

    return (
        <div className="add-mats-container">
            <h2>Добави нови стелки</h2>
            {notification && <div className={`notification ${notification.type}`}>{notification.message}</div>}
            <form onSubmit={handleSubmit} className="add-mats-form">
                <label>Заглавие:</label>
                <input value={title} onChange={e => setTitle(e.target.value)} required />

                <label>Материал:</label>
                <select value={material} onChange={e => setMaterial(e.target.value)} required>
                    <option value="">Избери</option>
                    <option value="Мокетни">Мокетни</option>
                    <option value="Гумени">Гумени</option>
                    <option value="Универсални">Универсални</option>
                </select>

                <label>Цвят:</label>
                <input value={color} onChange={e => setColor(e.target.value)} required />

                <label>Марка автомобил:</label>
                <select value={carBrand} onChange={e => setCarBrand(e.target.value)} required>
                    <option value="">Избери</option>
                    <option value="BMW">BMW</option>
                    <option value="Audi">Audi</option>
                    <option value="Mercedes">Mercedes</option>
                    <option value="VW">VW</option>
                    <option value="Toyota">Toyota</option>
                </select>

                <label>Модел автомобил:</label>
                <input value={carModel} onChange={e => setCarModel(e.target.value)} required />

                <label>Описание:</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />

                <label>Цена (лв):</label>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />

                <label>Снимки (до 4):</label>
                <input type="file" multiple accept="image/*" onChange={e => setImages(Array.from(e.target.files))} />

                <button type="submit">Добави стелка</button>
            </form>
        </div>
    );
}

export default AddMats;