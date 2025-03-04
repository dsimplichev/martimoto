import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <div className="section-cart">
            <h2>Вашата количка</h2>
            </div>
            <div className="divider-cart"></div>
            {cart.length > 0 ? (
                <>
                    <ul className="cart-list">
                        {cart.map(item => (
                            <li key={item.productId} className="cart-item">
                                <img src={item.mainImage} alt={item.title} className="cart-img" />
                                <span>{item.title}</span>
                                <span>{item.price} лв</span>
                                <span>Количество: {item.quantity}</span>
                                <button onClick={() => removeFromCart(item.productId)}>Премахни</button>
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