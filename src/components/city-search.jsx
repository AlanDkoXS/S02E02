import React, { useState } from "react";

function CitySearch({ onSearch }) {
  const [city, setCity] = useState("");

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="city-search">
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default CitySearch;
