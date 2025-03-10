import { useState, useEffect } from "react";

const OfficeSelector = () => {
  const [city, setCity] = useState("");
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    if (city.length > 2) {
      fetch(`https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getOffices.json`)
        .then((response) => response.json())
        .then((data) => {
          const filteredOffices = data.offices.filter((office) =>
            office.city.name.toLowerCase().includes(city.toLowerCase())
          );
          setOffices(filteredOffices);
        });
    } else {
      setOffices([]);
    }
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