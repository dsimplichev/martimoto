import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./order.css";
import { RiIdCardLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { FaTrash } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import NotificationCard from "../../Card/NotificationCard";

const Order = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isInvoice, setIsInvoice] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [city, setCity] = useState("");
  const [office, setOffice] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyReg, setCompanyReg] = useState("");
  const [companyEIK, setCompanyEIK] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [comment, setComment] = useState("");
  const [econtOffices, setEcontOffices] = useState([]);
  const [notification, setNotification] = useState(null);
  const debounceTimeoutRef = useRef(null);

  const [allEcontCities, setAllEcontCities] = useState([]);
  const [filteredEcontCities, setFilteredEcontCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [loadingEcontCities, setLoadingEcontCities] = useState(false);
  const [loadingEcontOffices, setLoadingEcontOffices] = useState(false);

  const totalAmount = cart.reduce(
    (total, product) => total + (product.price || 0) * (product.quantity || 1),
    0
  );

  useEffect(() => {
    const loadAllEcontCities = async () => {
      setLoadingEcontCities(true);
      try {
        const response = await axios.post(
          "https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getCities.json",
          { countryCode: "BGR" }
        );
        setAllEcontCities(response.data?.cities || []);
      } catch (error) {
        console.error("Грешка при зареждане на градове:", error);
      } finally {
        setLoadingEcontCities(false);
      }
    };
    loadAllEcontCities();
  }, []);

  const fetchEcontOffices = useCallback(async (cityId) => {
    setLoadingEcontOffices(true);
    setEcontOffices([]);
    setOffice("");
    try {
      const officesResponse = await axios.post(
        "https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getOffices.json",
        { countryCode: "BGR", cityID: cityId }
      );
      setEcontOffices(officesResponse.data?.offices || []);
    } catch (error) {
      console.error("Грешка при зареждане на офиси:", error);
      setEcontOffices([]);
    } finally {
      setLoadingEcontOffices(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

    if (city.length >= 2 && deliveryMethod === "Еконт") {
      debounceTimeoutRef.current = setTimeout(() => {
        const lowerCaseCity = city.toLowerCase();
        const matchingCities = allEcontCities.filter(
          (c) =>
            c.name.toLowerCase().includes(lowerCaseCity) ||
            c.nameEn.toLowerCase().includes(lowerCaseCity)
        );
        setFilteredEcontCities(matchingCities);

        const exactMatch = matchingCities.find(
          (c) =>
            c.name.toLowerCase() === lowerCaseCity ||
            c.nameEn.toLowerCase() === lowerCaseCity
        );

        if (exactMatch) {
          setSelectedCityId(exactMatch.id);
          fetchEcontOffices(exactMatch.id);
        } else {
          setSelectedCityId(null);
          setEcontOffices([]);
        }
      }, 500);
    } else {
      setFilteredEcontCities([]);
      setEcontOffices([]);
      setSelectedCityId(null);
      setOffice("");
    }

    return () => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    };
  }, [city, deliveryMethod, allEcontCities, fetchEcontOffices]);

  useEffect(() => {
    if (deliveryMethod !== "Еконт") {
      setEcontOffices([]);
      setFilteredEcontCities([]);
      setSelectedCityId(null);
      setOffice("");
    }
  }, [deliveryMethod]);

  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
    setCity("");
  };

  const handleInvoiceChange = () => {
    setIsInvoice(!isInvoice);
    if (isInvoice) {
      setCompanyName("");
      setCompanyReg("");
      setCompanyEIK("");
      setCompanyAddress("");
    }
  };

  const handleEcontCityInputChange = (e) => setCity(e.target.value);

  const handleEcontCitySelect = (e) => {
    const selectedCityName = e.target.value;
    setCity(selectedCityName);
    const cityObj = allEcontCities.find(
      (c) => c.name === selectedCityName || c.nameEn === selectedCityName
    );
    if (cityObj) {
      setSelectedCityId(cityObj.id);
      fetchEcontOffices(cityObj.id);
    } else {
      setSelectedCityId(null);
      setEcontOffices([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart.length) {
      setNotification({ type: "error", message: "Количката е празна!" });
      return;
    }

    if (deliveryMethod === "Еконт" && (!city || !office)) {
      setNotification({ type: "error", message: "Моля, изберете град и офис." });
      return;
    }
    if (deliveryMethod === "До Адрес" && (!city || !deliveryAddress)) {
      setNotification({ type: "error", message: "Моля, въведете град и адрес." });
      return;
    }
    if (isInvoice && (!companyName || !companyReg || !companyEIK || !companyAddress)) {
      setNotification({ type: "error", message: "Попълнете всички полета за фактура." });
      return;
    }

    const formData = new FormData(e.target);

    const orderData = {
      firstName: formData.get("firstName")?.trim(),
      lastName: formData.get("lastName")?.trim(),
      email: formData.get("email")?.trim(),
      phone: formData.get("phone")?.trim(),
      deliveryMethod,
      city: city.trim(),
      office: deliveryMethod === "Еконт" ? office : "",
      deliveryAddress: deliveryMethod === "До Адрес" ? deliveryAddress.trim() : "",
      companyName: isInvoice ? companyName.trim() : "",
      companyReg: isInvoice ? companyReg.trim() : "",
      companyEIK: isInvoice ? companyEIK.trim() : "",
      companyAddress: isInvoice ? companyAddress.trim() : "",
      comment: comment.trim(),
      cart: cart.map((item) => ({
        productId: item._id,
        itemType: item.itemType,
        quantity: item.quantity || 1,
        price: item.price || 0,
      })),
      totalAmount,
    };

    if (!orderData.firstName || !orderData.lastName || !orderData.email || !orderData.phone) {
      setNotification({ type: "error", message: "Моля, попълнете всички задължителни полета." });
      return;
    }

    console.log("Изпращам поръчка:", orderData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders/create",
        orderData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setNotification({
          type: "success",
          message: (
            <>
              <h1>Благодарим за поръчката!</h1>
              <p>Вашата поръчка беше направена успешно.</p>
            </>
          ),
        });
        clearCart();
        e.target.reset();
        setDeliveryMethod("");
        setCity("");
        setOffice("");
        setDeliveryAddress("");
        setCompanyName("");
        setCompanyReg("");
        setCompanyEIK("");
        setCompanyAddress("");
        setComment("");
        setIsInvoice(false);
      }
    } catch (error) {
      console.error("Грешка при поръчка:", error.response?.data || error);
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Грешка при изпращане. Опитайте отново.",
      });
    }
  };

  const handleRemoveItem = (id, itemType) => removeFromCart(id, itemType);

  return (
    <div className="order-container">
      {notification && (
        <NotificationCard
          type={notification.type}
          message={notification.message}
          onClose={() => {
            setNotification(null);
            if (notification.type === "success") navigate("/");
          }}
        />
      )}

      <div className="order-left">
        <h1 className="order-title">
          <RiIdCardLine /> Вашите данни
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="order-form-group-personal">
            <div className="order-input-group-personal">
              <label><span className="red-star">*</span>Име</label>
              <input type="text" name="firstName" required />
              <label><span className="red-star">*</span>Фамилия</label>
              <input type="text" name="lastName" required />
            </div>
          </div>

          <div className="order-form-group-personal">
            <div className="order-input-group-personal">
              <label><span className="red-star">*</span>Имейл</label>
              <input type="email" name="email" required />
              <label><span className="red-star">*</span>Телефон</label>
              <input type="tel" name="phone" required />
            </div>
          </div>

          <p className="order-required-note">
            Полетата със "<span className="red-star">*</span>" са задължителни
          </p>
          <hr className="order-divider" />

          <h2 className="order-title">
            <TbTruckDelivery /> Начин на доставка
          </h2>
          <div className="delivery-options">
            <button
              type="button"
              className={deliveryMethod === "Еконт" ? "delivery-btn selected" : "delivery-btn"}
              onClick={() => handleDeliveryChange("Еконт")}
            >
              До офис на Еконт
            </button>
            <button
              type="button"
              className={deliveryMethod === "До Адрес" ? "delivery-btn selected" : "delivery-btn"}
              onClick={() => handleDeliveryChange("До Адрес")}
            >
              До Адрес
            </button>
          </div>

          {deliveryMethod === "Еконт" && (
            <>
              <div className="order-form-group">
                <label><span className="red-star">*</span>Град</label>
                <input
                  type="text"
                  value={city}
                  onChange={handleEcontCityInputChange}
                  required
                  placeholder="Напишете град"
                  list="econt-cities-datalist"
                  onBlur={handleEcontCitySelect}
                />
                <datalist id="econt-cities-datalist">
                  {filteredEcontCities.map((c) => (
                    <option key={c.id} value={c.name} />
                  ))}
                </datalist>
                {loadingEcontCities && city.length >= 2 && <p className="loading-message">Зареждане...</p>}
                {!loadingEcontCities && city.length >= 2 && filteredEcontCities.length === 0 && (
                  <p className="no-results">Няма намерени градове за '{city}'</p>
                )}
              </div>

              <div className="order-form-group">
                <label><span className="red-star">*</span>Офис</label>
                <select
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                  required
                  disabled={!selectedCityId || loadingEcontOffices || econtOffices.length === 0}
                >
                  <option value="">
                    {loadingEcontOffices
                      ? "Зареждане..."
                      : selectedCityId && econtOffices.length > 0
                      ? "Изберете офис"
                      : "Няма офиси"}
                  </option>
                  {econtOffices.map((officeData) => (
                    <option key={officeData.id} value={officeData.address.fullAddress}>
                      {officeData.name} ({officeData.address.fullAddress})
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {deliveryMethod === "До Адрес" && (
            <>
              <div className="order-form-group">
                <label><span className="red-star">*</span>Град</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  placeholder="Въведете град"
                />
              </div>
              <div className="order-form-group">
                <label><span className="red-star">*</span>Адрес</label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                  placeholder="Въведете адрес"
                />
              </div>
            </>
          )}

          <div className="order-invoice-checkbox">
            <input type="checkbox" id="invoice" checked={isInvoice} onChange={handleInvoiceChange} />
            <label htmlFor="invoice">Желая фактура</label>
          </div>

          {isInvoice && (
            <>
              <div className="order-form-group">
                <label><span className="red-star">*</span>Фирма</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
              </div>
              <div className="order-form-group">
                <label><span className="red-star">*</span>МОЛ</label>
                <input type="text" value={companyReg} onChange={(e) => setCompanyReg(e.target.value)} required />
              </div>
              <div className="order-form-group">
                <label><span className="red-star">*</span>ЕИК</label>
                <input type="text" value={companyEIK} onChange={(e) => setCompanyEIK(e.target.value)} required />
              </div>
              <div className="order-form-group">
                <label><span className="red-star">*</span>Адрес</label>
                <input type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} required />
              </div>
            </>
          )}

          {!isInvoice && (
            <div className="order-form-group">
              <label>Коментар</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
          )}

          <hr className="order-divider" />
          <button type="submit" className="confirm-btn">Потвърди</button>
        </form>
      </div>

      <div className="order-right">
        <h2>Количка</h2>
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={`${item._id}-${item.itemType}`} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <p>{item.title}</p>
                <p>{(item.price || 0)} лв. x {(item.quantity || 1)}</p>
              </div>
              <button className="remove-btn" onClick={() => handleRemoveItem(item._id, item.itemType)}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <p><strong>Общо: {totalAmount.toFixed(2)} лв.</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Order;