import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./order.css";
import { RiIdCardLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { FaTrash } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";

const Order = () => {
  const { cart, setCart } = useContext(CartContext);
  
  const [isInvoice, setIsInvoice] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [city, setCity] = useState("");
  const [office, setOffice] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyReg, setCompanyReg] = useState("");
  const [companyEIK, setCompanyEIK] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [comment, setComment] = useState("");
  const [offices, setOffices] = useState([]);
  

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );



  useEffect(() => {
    if (deliveryMethod === "Еконт" && city.length > 2) {
      axios
        .get("https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getOffices.json", {
          params: { city: city }
        })
        .then((response) => {
          if (response.data && response.data.offices) {
            const filteredOffices = response.data.offices.filter((office) =>
              office.city?.name.toLowerCase().includes(city.toLowerCase())
            );
            setOffices(filteredOffices);
          } else {
            setOffices([]);
          }
        })
        .catch(() => setOffices([]));
    } else if (deliveryMethod === "Спиди" && city.length > 2) {

      axios
        .get("https://api.speedi.example/getOffices", { params: { city } })
        .then((response) => {
          if (response.data && response.data.offices) {

            setOffices(response.data.offices);
          } else {
            setOffices([]);
          }
        })
        .catch(() => setOffices([]));
    } else {
      setOffices([]);
    }
  }, [city, deliveryMethod]);

  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
  };

  const handleInvoiceChange = () => {
    setIsInvoice(!isInvoice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      firstName: document.querySelector("input[name='firstName']").value,
      lastName: document.querySelector("input[name='lastName']").value,
      email: document.querySelector("input[name='email']").value,
      phone: document.querySelector("input[name='phone']").value,
      deliveryMethod,
      city,
      office,
      companyName: isInvoice ? companyName : "",
      companyReg: isInvoice ? companyReg : "",
      companyEIK: isInvoice ? companyEIK : "",
      companyAddress: isInvoice ? companyAddress : "",
      comment,
      cart: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      totalAmount,
    };
    if (!cart.length) {
      alert("Количката е празна!");
      return;
    }
    console.log(orderData);
    try {
      const response = await axios.post("http://localhost:5000/api/orders/create", orderData);
      if (response.status === 201) {
        alert("Поръчката е направена успешно!"); 
        setCart([]);
      }
    } catch (error) {
      console.error("Грешка при запис на поръчката:", error);
    }
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    
  };

  return (
    <div className="order-container">
      <div className="order-left">
        <h1 className="order-title">
          <RiIdCardLine />
          Вашите данни
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-group">
              <label>
                <span className="red-star">*</span>Име
              </label>
              <input type="text" name="firstName" required />
              <label>
                <span className="red-star">*</span>Фамилия
              </label>
              <input type="text" name="lastName" required />
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <label>
                <span className="red-star">*</span>Имейл
              </label>
              <input type="email" name="email" required />
              <label>
                <span className="red-star">*</span>Телефонен номер
              </label>
              <input type="tel" name="phone" required />
            </div>
          </div>

          <p>
            Полетата отбелязани със"<span className="red-star">*</span>"са
            задължителни
          </p>
          <hr />

          <h2 className="order-title">
            <TbTruckDelivery />
            Начин на доставка
          </h2>
          <div className="delivery-options">
            <button
              type="button"
              className={deliveryMethod === "Еконт" ? "selected" : ""}
              onClick={() => handleDeliveryChange("Еконт")}
            >
              До офис на Еконт
            </button>
            <button
              type="button"
              className={deliveryMethod === "Спиди" ? "selected" : ""}
              onClick={() => handleDeliveryChange("Спиди")}
            >
              До офис на Спиди
            </button>
          </div>

          {(deliveryMethod === "Еконт" || deliveryMethod === "Спиди") && (
            <>
              <div className="form-group">
                <label>
                  <span className="red-star">*</span>Въведи вашият град
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value.trim())}
                  required
                  placeholder="Напишете град"
                />
              </div>
              <div className="form-group">
                <label>
                  <span className="red-star">*</span>Изберете офис
                </label>
                <select
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                  required
                >
                  <option value="">Изберете офис</option>
                  {offices.length > 0 ? (
                    offices.map((office) => (
                      <option key={office.id} value={office.name}>
                        {office.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Няма офиси за този град</option>
                  )}
                </select>
              </div>
            </>
          )}

          <div className="invoice-checkbox">
            <input
              type="checkbox"
              id="invoice"
              checked={isInvoice}
              onChange={handleInvoiceChange}
            />
            <label htmlFor="invoice">Желая фактура</label>
          </div>

          {isInvoice && (
            <>
              <div className="form-group">
                <label>
                  <span className="red-star">*</span>Име на фирмата
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <span className="red-star">*</span>Мол
                </label>
                <input
                  type="text"
                  value={companyReg}
                  onChange={(e) => setCompanyReg(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <span className="red-star">*</span>ЕИК
                </label>
                <input
                  type="text"
                  value={companyEIK}
                  onChange={(e) => setCompanyEIK(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <span className="red-star">*</span>Адрес на фирмата
                </label>
                <input
                  type="text"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {!isInvoice && (
            <div className="form-group">
              <label>Коментар към поръчката</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
          )}

          <hr />

          <button type="submit" className="confirm-btn">
            Потвърди
          </button>
        </form>
      </div>

      <div className="order-right">
        <h2>Вашата количка</h2>
        <ul>
          {cart.map((product) => (
            <li key={product.id} className="cart-item">
              <img
                src={product.image}
                alt={product.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <p>{product.title}</p>
                <p>
                  {product.price} лв. x {product.quantity}
                </p>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveItem(product.id)}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <p>
            <strong>Обща сума: {totalAmount} лв.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;