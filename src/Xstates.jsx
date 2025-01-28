import React, { useState, useEffect } from "react";
import axios from "axios";

function XStates() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [message, setMessage] = useState("");

  // Fetch all countries on component mount
  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching countries:", error.message));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
        .then((response) => setStates(response.data))
        .catch((error) => console.error("Error fetching states:", error.message));
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((response) => setCities(response.data))
        .catch((error) => console.error("Error fetching cities:", error.message));
    }
  }, [selectedState]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState(""); // Reset state and city selection
    setSelectedCity("");
    setStates([]);
    setCities([]);
    setMessage(""); // Reset message
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity(""); // Reset city selection
    setCities([]);
    setMessage(""); // Reset message
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setMessage(
      `You selected ${e.target.value}, ${selectedState}, ${selectedCountry}`
    );
  };

  return (
    <div>
      <h2>Location Selector</h2>
      <div>
        {/* Country Dropdown */}
        <label htmlFor="country">Select Country: </label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
                      <option value="">
 Select Country
            </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
        {/* State Dropdown */}
        <label htmlFor="state">Select State: </label>
        <select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
                                <option value="">
 Select State
            </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div>
        {/* City Dropdown */}
        <label htmlFor="city">Select City: </label>
        <select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
                                <option value="">
 Select City
            </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Message Display */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default XStates;
