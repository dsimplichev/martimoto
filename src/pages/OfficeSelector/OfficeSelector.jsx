import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const OfficeSelector = () => {
  const [city, setCity] = useState("");
  const [offices, setOffices] = useState([]);

  const fetchOffices = debounce((city) => {
    if (city.length > 2) {
      fetch(`https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getOffices.json?city=${city}`)
        .then((response) => response.json())
        .then((data) => {
          const filteredOffices = data.offices.filter((office) =>
            office.city.name.toLowerCase().includes(city.toLowerCase())
          );
          setOffices(filteredOffices);
        })
        .catch((error) => {
          console.error("Грешка при заявката:", error);
          setOffices([]);
        });
    } else {
      setOffices([]);
    }
  }, 500);

  useEffect(() => {
    fetchOffices(city);
  }, [city]);

  return (
    <div>
      <input
        type="text"
        placeholder="Въведете град"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <ul>
        {offices.map((office) => (
          <li key={office.id}>{office.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default OfficeSelector;