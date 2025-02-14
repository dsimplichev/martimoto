import { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext'; 
import "./addaccessory.css";

function AddAccessory() {
    const { user, isLoggedIn } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]); 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!title || !description || !price || !category || images.length === 0) {
            setMessage("Моля, попълнете всички полета и качете поне едно изображение!");
            return;
        }
        
        setMessage("Аксесоарът е добавен успешно!");
        //изпращане на данните и изображенията към бекенд или Cloudinary
    };

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + images.length <= 4) {
            setImages([...images, ...selectedFiles]);
        } else {
            alert('Можете да качите максимум 4 снимки!');
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    if (!isLoggedIn || user.role !== 'admin') {
        return <p>Нямате права да достъпвате тази страница.</p>;
    }

    return (
        <div>
            <h2>Добави аксесоар</h2>
            <form className="add-accessory-form" onSubmit={handleSubmit}>
                <div>
                    <label>Избери категория</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Изберете категория</option>
                        <option value="балансьори">Балансьори</option>
                        <option value="краш тапи">Краш тапи</option>
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
                    <label htmlFor="image-upload" className="upload-label">
                        <i className="fas fa-upload"></i> Добави изображения
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="upload-button"
                        onChange={handleImageChange}
                        multiple
                    />
                    <div className="image-previews">
                        {images.map((image, index) => (
                            <div key={index} className="image-preview">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded ${index}`}
                                    style={{ width: '100px', marginTop: '10px' }}
                                />
                                <button type="button" onClick={() => handleRemoveImage(index)}>Изтрий</button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit">Добави аксесоар</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default AddAccessory;