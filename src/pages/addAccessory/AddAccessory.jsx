import { useState } from 'react';
import "./addaccessory.css"

function AddAccessory() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        if (!title || !description || !price || !category) {
            setMessage("Моля, попълнете всички полета!");
            return;
        }

        
        setMessage("Аксесоарът е добавен успешно! (тук ще добавим бекенд връзка)");

        
    };

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
                <button type="submit">Добави аксесоар</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default AddAccessory;