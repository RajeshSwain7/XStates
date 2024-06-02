import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [cstates, setStates] = useState([]);
  const [city, setCity] = useState([]);

  const [selectcountry, setSelectCountry] = useState("");
  const [selectstate, setSelectState] = useState("");
  const [selectcity, setSelectCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setCountries([]); // Set to empty array on error
      });
  }, []);

  useEffect(() => {
    if (selectcountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectcountry}/states`)
        .then((response) => response.json())
        .then((data) => setStates(data))
        .catch((error) => {
          console.error("Error fetching states:", error);
          setStates([]); // Set to empty array on error
        });
    }
  }, [selectcountry]);

  useEffect(() => {
    if (selectcountry && selectstate) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectcountry}/state=${selectstate}/cities`)
        .then((response) => response.json())
        .then((data) => setCity(data))
        .catch((error) => {
          console.error("Error fetching cities:", error);
          setCity([]); // Set to empty array on error
        });
    }
  }, [selectstate, selectcountry]);

  const handleCountryChange = (e) => {
    setSelectCountry(e.target.value);
    setSelectState("");
    setSelectCity("");
  };

  const handleStateChange = (e) => {
    setSelectState(e.target.value);
    setSelectCity("");
  };

  const handleCityChange = (e) => {
    setSelectCity(e.target.value);
  };

  return (
    <div className="App">
      <h1>Select Location</h1>
      <div style={{ display: "flex", justifyContent: "space-between", width: "90%", height: "90%", color: "black" }}>
        <select value={selectcountry} onChange={handleCountryChange}>
          <option value="" disabled>Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <select value={selectstate} onChange={handleStateChange} disabled={!selectcountry}>
          <option value="" disabled>Select State</option>
          {cstates.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select value={selectcity} onChange={handleCityChange} disabled={!selectcountry || !selectstate}>
          <option value="" disabled>Select City</option>
          {city.map((cit) => (
            <option key={cit} value={cit}>{cit}</option>
          ))}
        </select>
      </div>
      {selectcity && (
        <h2>You selected {selectcity}, {selectstate}, {selectcountry}</h2>
      )}
    </div>
  );
}

export default App;
