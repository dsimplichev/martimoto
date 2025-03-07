import React, { useState } from "react";
import "./order.css";

const Order = () => {
  const [isInvoice, setIsInvoice] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [city, setCity] = useState("");
  const [office, setOffice] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyReg, setCompanyReg] = useState("");
  const [companyEIK, setCompanyEIK] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [comment, setComment] = useState("");

  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
  };

  const handleInvoiceChange = () => {
    setIsInvoice(!isInvoice);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Форма изпратена");
  };

  return (
    <div className="order-container">
      <h1>Вашите данни</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <label><span className="red-star">*</span>Име</label>
            <input type="text"  required />
            <label><span className="red-star">*</span>Фамилия</label>
            <input type="text"  required />
          </div>
        </div>

        <div className="form-group">
          <div className="input-group">
            <label><span className="red-star">*</span>Имейл</label>
            <input type="email" required />
            <label><span className="red-star">*</span>Телефонен номер</label>
            <input type="tel" required />
          </div>
        </div>

        <p>Полетата отбелязани със"<span className="red-star">*</span>"са задължителни</p>
        <hr />

        <h2>Начин на доставка</h2>
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

        {deliveryMethod && (
          <>
            <div className="form-group">
              <label><span className="red-star">*</span>Въведи вашият град</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className="form-group">
              <label><span className="red-star">*</span>Изберете офис</label>
              <input type="text" value={office} onChange={(e) => setOffice(e.target.value)} required />
            </div>
          </>
        )}

        <div className="form-group">
          <label>
            <input type="checkbox" checked={isInvoice} onChange={handleInvoiceChange} />
            Желая фактура
          </label>
        </div>

        {isInvoice && (
          <>
            <div className="form-group">
              <label><span className="red-star">*</span>Име на фирмата</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label><span className="red-star">*</span>Мол</label>
              <input type="text" value={companyReg} onChange={(e) => setCompanyReg(e.target.value)} required />
            </div>
            <div className="form-group">
              <label><span className="red-star">*</span>ЕИК</label>
              <input type="text" value={companyEIK} onChange={(e) => setCompanyEIK(e.target.value)} required />
            </div>
            <div className="form-group">
              <label><span className="red-star">*</span>Адрес на фирмата</label>
              <input type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} required />
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

        <h2>Начин на плащане</h2>
        <p>Пратката се заплаща на куриерската фирма, след преглед и тест.</p>

        <button type="submit" className="confirm-btn">
          Потвърди
        </button>
      </form>
    </div>
  );
};

export default Order;