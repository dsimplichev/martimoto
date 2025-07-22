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
  const [speedyOffices, setSpeedyOffices] = useState([]);
  const [notification, setNotification] = useState(null);
  const debounceTimeoutRef = useRef(null);

  const [allEcontCities, setAllEcontCities] = useState([]);
  const [filteredEcontCities, setFilteredEcontCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [loadingEcontCities, setLoadingEcontCities] = useState(false);
  const [loadingEcontOffices, setLoadingEcontOffices] = useState(false);
  const [loadingSpeedyOffices, setLoadingSpeedyOffices] = useState(false); // New loading state for Speedy

  const totalAmount = cart.reduce(
    (total, product) => total + (product.price || 0) * (product.quantity || 1),
    0
  );

  // Load all Econt cities on component mount
  useEffect(() => {
    const loadAllEcontCities = async () => {
      setLoadingEcontCities(true);
      try {
        const response = await axios.post("https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getCities.json", {
          countryCode: "BGR"
        });
        console.log("Всички Еконт градове (getCities.json):", response.data);
        setAllEcontCities(response.data?.cities || []);
      } catch (error) {
        console.error("Грешка при зареждане на всички Еконт градове:", error);
      } finally {
        setLoadingEcontCities(false);
      }
    };

    loadAllEcontCities();
  }, []);

  // Memoized function for fetching Econt offices
  const fetchEcontOffices = useCallback(async (cityId) => {
    setLoadingEcontOffices(true);
    setEcontOffices([]);
    setOffice(""); // Clear selected office when city changes

    try {
      const officesResponse = await axios.post("https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getOffices.json", {
        countryCode: "BGR",
        cityID: cityId
      });
      console.log("Еконт офиси отговор (getOffices.json):", officesResponse.data);

      setEcontOffices(officesResponse.data?.offices || []);
    } catch (error) {
      console.error("Грешка при зареждане на Еконт офиси:", error);
      setEcontOffices([]);
    } finally {
      setLoadingEcontOffices(false);
    }
  }, []); // Empty dependency array means this function is created once

  // Memoized function for fetching Speedy offices
  const fetchSpeedyOffices = useCallback(async (cityName) => {
    setLoadingSpeedyOffices(true);
    setSpeedyOffices([]);
    setOffice(""); // Clear selected office when city changes

    try {
      const response = await axios.get(`https://www.speedy.bg/back-end/locations/offices?query=${encodeURIComponent(cityName)}`);
      console.log("Спиди отговор:", response.data);
      setSpeedyOffices(response.data?.offices || response.data?.data || []);
    } catch (error) {
      console.error("Грешка при зареждане на Спиди офиси:", error);
      setSpeedyOffices([]);
    } finally {
      setLoadingSpeedyOffices(false);
    }
  }, []); // Empty dependency array means this function is created once

  // Effect to handle city input changes and trigger office fetching with debounce
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (city.length >= 2) {
      debounceTimeoutRef.current = setTimeout(() => {
        if (deliveryMethod === "Еконт") {
          const lowerCaseCity = city.toLowerCase();
          const matchingCities = allEcontCities.filter(c =>
            c.name.toLowerCase().includes(lowerCaseCity) ||
            c.nameEn.toLowerCase().includes(lowerCaseCity)
          );
          setFilteredEcontCities(matchingCities);

          const exactMatchCity = matchingCities.find(c =>
            c.name.toLowerCase() === lowerCaseCity ||
            c.nameEn.toLowerCase() === lowerCaseCity
          );

          if (exactMatchCity) {
            setSelectedCityId(exactMatchCity.id);
            fetchEcontOffices(exactMatchCity.id);
          } else {
            setSelectedCityId(null);
            setEcontOffices([]);
          }
        } else if (deliveryMethod === "Спиди") {
          fetchSpeedyOffices(city);
        }
      }, 500); // Debounce time
    } else {
      // Clear suggestions/offices if city input is too short
      setFilteredEcontCities([]);
      setEcontOffices([]);
      setSelectedCityId(null);
      setSpeedyOffices([]);
      setOffice("");
    }

    // Cleanup function for debounce
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [city, deliveryMethod, allEcontCities, fetchEcontOffices, fetchSpeedyOffices]); // Dependencies

  // Effect to clear offices when delivery method changes or city is cleared
  useEffect(() => {
    // This effect ensures offices are cleared appropriately
    if (deliveryMethod !== "Еконт") {
        setEcontOffices([]);
        setFilteredEcontCities([]);
        setSelectedCityId(null);
    }
    if (deliveryMethod !== "Спиди") {
        setSpeedyOffices([]);
    }
    setOffice(""); // Always clear office when delivery method changes
  }, [deliveryMethod]);

  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
    setCity(""); // Clear city when delivery method changes to reset
  };

  const handleInvoiceChange = () => {
    setIsInvoice(!isInvoice);
    // Clear company details when invoice is unchecked
    if (isInvoice) {
      setCompanyName("");
      setCompanyReg("");
      setCompanyEIK("");
      setCompanyAddress("");
    }
  };

  const handleEcontCityInputChange = (e) => {
    setCity(e.target.value); // Just update the city state, useEffect will handle fetching
  };

  const handleEcontCitySelect = (e) => {
    const selectedCityName = e.target.value;
    setCity(selectedCityName);
    // Find the exact city object from allEcontCities to get its ID
    const cityObj = allEcontCities.find(c => c.name === selectedCityName || c.nameEn === selectedCityName);
    if (cityObj) {
      setSelectedCityId(cityObj.id);
      fetchEcontOffices(cityObj.id); // Immediately fetch offices for selected city
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

    if ((deliveryMethod === "Еконт" || deliveryMethod === "Спиди") && (!city || !office)) {
      setNotification({ type: "error", message: "Моля, въведете град и изберете офис за доставка." });
      return;
    }
    if (deliveryMethod === "До Адрес" && (!city || !deliveryAddress)) {
      setNotification({ type: "error", message: "Моля, въведете град и адрес за доставка." });
      return;
    }

    if (isInvoice && (!companyName || !companyReg || !companyEIK || !companyAddress)) {
      setNotification({ type: "error", message: "Моля, попълнете всички полета за фактура." });
      return;
    }

    const orderData = {
      firstName: document.querySelector("input[name='firstName']").value,
      lastName: document.querySelector("input[name='lastName']").value,
      email: document.querySelector("input[name='email']").value,
      phone: document.querySelector("input[name='phone']").value,
      deliveryMethod,
      city,
      office: deliveryMethod === "Еконт" || deliveryMethod === "Спиди" ? office : "",
      deliveryAddress: deliveryMethod === "До Адрес" ? deliveryAddress : "",
      companyName: isInvoice ? companyName : "",
      companyReg: isInvoice ? companyReg : "",
      companyEIK: isInvoice ? companyEIK : "",
      companyAddress: isInvoice ? companyAddress : "",
      comment,
      cart: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
        title: item.title,
        image: item.image,
        itemType: item.itemType
      })),
      totalAmount,
    };

    console.log(orderData);
    try {
      const response = await axios.post("http://localhost:5000/api/orders/create", orderData);
      if (response.status === 201) {
        setNotification({
          type: "success",
          message: (
            <>
              <h1>Благодарим за поръчката!</h1>
              <p>Вашата поръчка беше направена успешно и ще бъде обработена скоро.</p>
            </>
          ),
        });
        clearCart(); // Clear cart immediately on success
        // Optionally, clear form fields here if you want the form to reset
        setDeliveryMethod("");
        setDeliveryAddress("");
        setCity("");
        setOffice("");
        setCompanyName("");
        setCompanyReg("");
        setCompanyEIK("");
        setCompanyAddress("");
        setComment("");
        setIsInvoice(false);
        // Clear inputs by updating their state (if they were controlled components)
        // For uncontrolled inputs, you might need to reset the form or use a ref.
        // For now, they'll clear on navigation if success is handled.
      }
    } catch (error) {
      console.error("Грешка при запис на поръчката:", error);
      setNotification({ type: "error", message: "Възникна грешка при изпращане на поръчката. Моля, опитайте отново." });
    }
  };

  const handleRemoveItem = (id, itemType) => {
    removeFromCart(id, itemType);
  };

  return (
    <div className="order-container">
      {notification && (
        <NotificationCard
          type={notification.type}
          message={notification.message}
          onClose={() => {
            setNotification(null);
            if (notification.type === "success") {
                navigate("/"); // Navigate home after successful order and notification dismissal
            }
          }}
        />
      )}

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
            <button
              type="button"
              className={deliveryMethod === "До Адрес" ? "selected" : ""}
              onClick={() => handleDeliveryChange("До Адрес")}
            >
              До Адрес
            </button>
          </div>

          {deliveryMethod === "Еконт" && (
            <>
              <div className="form-group">
                <label>
                  <span className="red-star">*</span>Въведи вашият град
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={handleEcontCityInputChange} // Simplified onChange
                  required
                  placeholder="Напишете град"
                  list="econt-cities-datalist"
                  onBlur={handleEcontCitySelect} // Handle selection when input loses focus (important for datalist)
                />

                <datalist id="econt-cities-datalist">
                  {filteredEcontCities.map((c) => (
                    <option key={c.id} value={c.name} />
                  ))}
                </datalist>

                {loadingEcontCities && city.length >= 2 && <p>Зареждане на градове...</p>}
                {!loadingEcontCities && city.length >= 2 && filteredEcontCities.length === 0 && (
                  <p className="no-results">Няма намерени градове, които съдържат '{city}'</p>
                )}
              </div>

              <div className="form-group">
                <label>
                  <span className="red-star">*</span>Изберете офис
                </label>
                <select
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                  required
                  disabled={!selectedCityId || loadingEcontOffices || econtOffices.length === 0}
                >
                  <option value="">
                    {loadingEcontOffices ? "Зареждане на офиси..." :
                      selectedCityId && econtOffices.length > 0 ? "Изберете офис" :
                        selectedCityId && econtOffices.length === 0 ? "Няма намерени офиси за избрания град." :
                          "Първо изберете град"
                    }
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
          {deliveryMethod === "Спиди" && (
            <>
              <div className="form-group">
                <label>
                  <span className="red-star">*</span>Въведи вашият град
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)} // useEffect will trigger fetchSpeedyOffices
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
                  disabled={loadingSpeedyOffices || speedyOffices.length === 0}
                >
                  <option value="">
                    {loadingSpeedyOffices ? "Зареждане на офиси..." :
                     city.length < 2 ? "Въведете поне 2 символа за град" :
                     speedyOffices.length === 0 ? "Няма намерени офиси за този град." :
                     "Изберете офис"
                    }
                  </option>
                  {speedyOffices.map((officeData) => (
                    <option key={officeData.id} value={officeData.name}>
                      {officeData.name} ({officeData.address})
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {deliveryMethod === "До Адрес" && (
            <>
              <div className="form-group">
                <label>
                  <span className="red-star">*</span>Град
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  placeholder="Въведете град"
                />
              </div>
              <div className="form-group">
                <label>
                  <span className="red-star">*</span>Адрес за доставка
                </label>
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
          {cart.map((item) => (
            <li key={`${item._id}-${item.itemType}`} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <p>{item.title}</p>
                <p>
                  {(item.price || 0)} лв. x {(item.quantity || 1)}
                </p>
              </div>
              <button
                className="remove-btn"
                onClick={() => {
                  handleRemoveItem(item._id, item.itemType);
                }}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <p>
            <strong>Обща сума: {totalAmount.toFixed(2)} лв.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;