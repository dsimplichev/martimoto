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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!title || !description || !price || !category || images.length === 0) {
            setMessage("Моля, попълнете всички полета и качете поне едно изображение!");
            return;
        }
    
        try {
            const formData = new FormData();
            images.forEach(image => formData.append('images', image));
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('type', 'accessory')
            
    
            const response = await fetch("http://localhost:5000/api/accessories", {
                method: "POST",
                body: formData
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Грешка при качването:", errorData);
                throw new Error("Неуспешно качване!");
            }
    
            setMessage("Аксесоарът е добавен успешно!");
            
            setTimeout(() => {
                navigate("/accessories");
            }, 1500);
            
        } catch (error) {
            setMessage("Грешка при качването!");
            console.error(error);
        }
    };

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + images.length <= 5) {
            setImages([...images, ...selectedFiles]);
        } else {
            alert('Можете да качите максимум 5 снимки!');
        }
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    if (!isLoggedIn || user.role !== 'admin') {
        return <p>Нямате права да достъпвате тази страница.</p>;
    }

    return (
        <div>
            <h2>Добави аксесоар</h2>
            <form className="acc-form-container" onSubmit={handleSubmit}>
                <div>
                    <label>Избери категория</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Изберете категория</option>
                        <option value="балансьори">Балансьори</option>
                        <option value="краш-тапи">Краш тапи</option>
                        <option value="гараж">Гараж</option>
                        <option value="лепенки">Лепенки</option>
                        <option value="ръкохватки">Ръкохватки</option>
                    </select>
                </div>

                <div>
                    <label>Заглавие</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label>Описание</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label>Цена</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="acc-image-upload" className="acc-upload-label">
                        <i className="fas fa-upload"></i> Добави изображения
                    </label>
                    <input
                        id="acc-image-upload"
                        type="file"
                        accept="image/*"
                        className="acc-upload-button"
                        onChange={handleImageChange}
                        multiple
                    />
                    <div className="acc-image-previews-list">
                        {images.map((image, index) => (
                            <div key={index} className="acc-image-preview-item">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded ${index}`}
                                    className="acc-preview-thumb"
                                />
                                <button
                                    type="button"
                                    className="acc-remove-image-btn"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button className='acc-submit-btn' type="submit">Добави аксесоар</button>
            </form>

            {message && <p className="acc-message">{message}</p>}
        </div>
    );
}

export default AddAccessory;