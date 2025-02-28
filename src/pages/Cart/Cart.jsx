import { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    
    useEffect(() => {
        axios.get('http://localhost:5000/cart', { withCredentials: true })
            .then(response => {
                setCart(response.data.items || []); 
            })
            .catch(error => console.error('Error fetching cart:', error));
    }, []);

    
    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalPrice(total);
    }, [cart]);

    
    const removeFromCart = (productId) => {
        axios.delete(`http://localhost:5000/cart/${productId}`, { withCredentials: true })
            .then(() => {
                setCart(cart.filter(item => item.id !== productId)); 
            })
            .catch(error => console.error('Error removing item:', error));
    };

    return (
        <div className="cart-container">
            <h2>Вашата количка</h2>
            {cart.length > 0 ? (
                <>
                    <ul className="cart-list">
                        {cart.map(item => (
                            <li key={item.id} className="cart-item">
                                <img src={item.mainImage} alt={item.name} className="cart-img" />
                                <span>{item.name}</span>
                                <span>{item.price} лв</span>
                                <span>Количеството: {item.quantity}</span>
                                <button onClick={() => removeFromCart(item.id)}>Премахни</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Обща сума: {totalPrice.toFixed(2)} лв</h3>
                    <button className="checkout-btn">Завърши поръчката</button>
                </>
            ) : (
                <p className="empty-cart">Кошницата ви е празна!</p>
            )}
        </div>
    );
};

export default Cart;