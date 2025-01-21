import { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext'; 
import "./addpart.css";

function AddPart() {
    const { user, isLoggedIn } = useContext(AuthContext); 
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [cylinder, setCylinder] = useState('');
    const [year, setYear] = useState('');
    const [partName, setPartName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

       
        if (!brand || !model || !cylinder || !year || !partName || !description || !price) {
            setMessage("Моля, попълнете всички полета!");
            return;
        }

        setMessage("Частта е добавена успешно! (тук ще добавим бекенд връзка)");

       
    };

    
    if (!isLoggedIn || user.role !== 'admin') {
        return <p>Нямате права да достъпвате тази страница.</p>; 
    }

    return (
        <div>
            <h2>Добави част</h2>
            <form className="add-part-form" onSubmit={handleSubmit}>
                <div>
                    <label>Марка</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </div>
                <div>
                    <label>Модел</label>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </div>
                <div>
                    <label>Кубатура</label>
                    <input
                        type="text"
                        value={cylinder}
                        onChange={(e) => setCylinder(e.target.value)}
                    />
                </div>
                <div>
                    <label>Година</label>
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <div>
                    <label>Име на частта</label>
                    <input
                        type="text"
                        value={partName}
                        onChange={(e) => setPartName(e.target.value)}
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
                <button type="submit">Добави част в количка</button>
            </form>

            {message && <p className={message.includes('успешно') ? 'message' : 'message error'}>{message}</p>}
        </div>
    );
}

export default AddPart;