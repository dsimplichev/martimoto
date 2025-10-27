import React, { useState } from "react";
import axios from "axios";
import "./AddWiperFluidForm.css";

const AddWiperFluidForm = () => {
    const [title, setTitle] = useState("");
    const [volume, setVolume] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [notification, setNotification] = useState(null);

    
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = [...images, ...files].slice(0, 3);
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

        if (!title || !volume || !price || images.length === 0) {
            setNotification({ type: "error", message: "Моля, попълнете всички полета и добавете поне едно изображение!" });
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("volume", volume);
        formData.append("price", price);
        images.forEach(image => formData.append("images", image));

        try {
            const response = await axios.post(
                "http://localhost:5000/api/wiper-fluid/add",
                formData
            );

            if (response.status === 201) {
                setNotification({ type: "success", message: "Течността беше добавена успешно!" });
                setTitle("");
                setVolume("");
                setPrice("");
                setImages([]);
                setPreviews([]);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Грешка при добавяне на течността.";
            setNotification({ type: "error", message: errorMessage });
        }
    };

    return (
        <div className="add-wiperfluid-form-container">
            <h2>Добавяне на течност за чистачки</h2>
            {notification && <div className={`notification ${notification.type}`}>{notification.message}</div>}

            <form onSubmit={handleSubmit} className="add-wiperfluid-form">
                <label>Заглавие:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Напр. Течност за чистачки - зимна"
                />

                <label>Разфасовка (литри):</label>
                <input
                    type="text"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    placeholder="Напр. 2L"
                />

                <label>Цена (лв):</label>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Напр. 8.50"
                />

                <label>Изображения (до 3):</label>
                <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                />

                
                <div className="preview-container-fluid">
                    {previews.map((src, idx) => (
                        <div key={idx} className="preview-item-fluid">
                            <img src={src} alt={`preview-${idx}`} className="preview-img-fluid" />
                            <button
                                type="button"
                                className="remove-img-btn-fluid"
                                onClick={() => handleRemoveImage(idx)}
                            >
                                &times; 
                            </button>
                        </div>
                    ))}
                </div>

                <button type="submit" className="submit-btn-fluid">Добави течност</button>
            </form>
        </div>
    );
};

export default AddWiperFluidForm;