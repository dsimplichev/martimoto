import React, { useState } from "react";
import axios from "axios";
import "./AddWiperFluidForm.css";

const AddWiperFluidForm = () => {
    const [title, setTitle] = useState("");
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

        if (!title || !volume || !price || images.length === 0) {
            setNotification({ type: "error", message: "Попълнете всички полета и качете поне 1 снимка!" });
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("volume", volume);
        formData.append("price", price);
        images.forEach(img => formData.append("images", img));

        try {
            const response = await axios.post(
                "http://localhost:5000/api/wiper-fluid/add",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setNotification({ type: "success", message: "Течността е добавена успешно!" });
            setTitle("");
            setVolume("");
            setPrice("");
            setImages([]);
            document.getElementById('wiper-images').value = null;
        } catch (error) {
            const msg = error.response?.data?.message || "Грешка при добавяне.";
            setNotification({ type: "error", message: msg });
        }
    };

    return (
        <div className="add-wiper-container">
            <h2>Добавяне на течност за чистачки</h2>

            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="add-wiper-form">
                
                <div className="form-group">
                    <label>Заглавие</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="напр. Зимна течност -20°C"
                        required
                    />
                </div>

                
                <div className="form-group">
                    <label>Разфасовка (литри)</label>
                    <input
                        type="text"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        placeholder="напр. 2L, 5L"
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
                        placeholder="8.50"
                        required
                    />
                </div>

                
                <div className="form-group">
                    <label>Снимки (до 3)</label>
                    <label htmlFor="wiper-images" className="upload-btn">
                        Качи снимки
                    </label>
                    <input
                        id="wiper-images"
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

                <button type="submit" className="submit-btn">Добави течност</button>
            </form>
        </div>
    );
};

export default AddWiperFluidForm;