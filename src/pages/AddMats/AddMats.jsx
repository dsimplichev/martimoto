import React, { useState } from "react";
import "./AddMats.css";

function AddMats() {
    const [title, setTitle] = useState("");
    const [material, setMaterial] = useState("");
    const [color, setColor] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const [notification, setNotification] = useState("");

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(""), 3000);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 4);
        setImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const imageUrls = [];
            for (const file of images) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "your_upload_preset");

                const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();
                imageUrls.push(data.secure_url);
            }

            
            const response = await fetch("http://localhost:5000/api/mats/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    material,
                    color,
                    brand,
                    model,
                    description,
                    price,
                    images: imageUrls,
                }),
            });

            if (response.ok) {
                showNotification("Продуктът беше добавен успешно!");
                setTitle("");
                setMaterial("");
                setColor("");
                setBrand("");
                setModel("");
                setDescription("");
                setPrice("");
                setImages([]);
            } else {
                showNotification("Възникна грешка при добавянето на продукта!");
            }
        } catch (error) {
            console.error("Грешка при качването:", error);
            showNotification("Грешка при връзката със сървъра!");
        }
    };

    return (
        <div className="add-mats-container">
            <h2>Добави нови стелки</h2>

            {notification && <div className="cart-notification-center">{notification}</div>}

            <form onSubmit={handleSubmit} className="add-mats-form">
                <label>Заглавие на продукта:</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label>Материал:</label>
                <select value={material} onChange={(e) => setMaterial(e.target.value)} required>
                    <option value="">Избери</option>
                    <option value="Мокетни">Мокетни</option>
                    <option value="Гумени">Гумени</option>
                    <option value="Универсални">Универсални</option>
                </select>

                <label>Цвят:</label>
                <input value={color} onChange={(e) => setColor(e.target.value)} required />

                <label>Марка автомобил:</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} required>
                    <option value="">Избери</option>
                    <option value="BMW">BMW</option>
                    <option value="Audi">Audi</option>
                    <option value="Mercedes">Mercedes</option>
                    <option value="VW">VW</option>
                    <option value="Toyota">Toyota</option>
                </select>

                <label>Модел автомобил:</label>
                <input value={model} onChange={(e) => setModel(e.target.value)} required />

                <label>Описание:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                <label>Цена (лв):</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

                <label>Снимки (до 4):</label>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} />

                <button type="submit" className="submit-btn">Добави продукт</button>
            </form>
        </div>
    );
}

export default AddMats;