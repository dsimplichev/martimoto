import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import "./addaccessory.css";

function AddAccessory() {
    const { user, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);

    const categories = [
        "балансьори",
        "краш-тапи",
        "гараж",
        "лепенки",
        "ръкохватки"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !price || !category || images.length === 0) {
            setMessage("Моля, попълнете всички полета и качете поне едно изображение!");
            return;
        }

        try {
            const formData = new FormData();
            images.forEach(img => formData.append('images', img));
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('type', 'accessory');

            const response = await fetch("http://localhost:5000/api/accessories", {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error("Грешка при качване!");

            setMessage("Аксесоарът е добавен успешно!");
            setTimeout(() => navigate("/accessories"), 1500);
        } catch (error) {
            setMessage("Грешка при добавяне на аксесоар!");
            console.error(error);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 5) {
            alert('Макс. 5 снимки!');
            return;
        }
        setImages([...images, ...files]);
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    if (!isLoggedIn || user.role !== 'admin') {
        return <p className="access-denied">Нямате права за достъп.</p>;
    }

    return (
        <div className="add-accessory-container">
            <form className="add-accessory-form" onSubmit={handleSubmit}>
                <h2>Добави аксесоар</h2>

                
                <div className="form-group">
                    <label>Категория</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Избери категория</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                
                <div className="form-group">
                    <label>Заглавие</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="напр. Краш тапи R&G"
                        required
                    />
                </div>

                
                <div className="form-group">
                    <label>Описание</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        placeholder="Кратко описание на аксесоара..."
                        required
                    />
                </div>

                
                <div className="form-group">
                    <label>Цена (лв.)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        placeholder="89.90"
                        required
                    />
                </div>

               
                <div className="form-group">
                    <label>Снимки (макс. 5)</label>
                    <label htmlFor="acc-image-upload" className="upload-btn">
                        Качи снимки
                    </label>
                    <input
                        id="acc-image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="file-input"
                    />
                    <div className="image-previews">
                        {images.map((img, i) => (
                            <div key={i} className="preview-item">
                                <img src={URL.createObjectURL(img)} alt={`Preview ${i}`} />
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

                <button type="submit" className="submit-btn">
                    Добави аксесоар
                </button>
            </form>

            {message && (
                <p className={`message ${message.includes('Грешка') ? 'error' : 'success'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default AddAccessory;