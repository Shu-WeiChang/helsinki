import axios from "axios";
import React, { useState, useEffect } from "react";
require("dotenv").config();

const Weather = ({ weather }) => {
  return (
    <div>
      <ul>
        <li>{weather.temp}</li>
        <li>{weather.feels_like}</li>
        <li>{weather.temp_min}</li>
      </ul>
    </div>
  )
}

const CountryShow = ({ countries, handleShow }) => {
  return (
    <div>
      <span>{countries.name}</span>
      <button onClick={()=> handleShow(countries.name)}>
        Show
      </button>
    </div>
  )
}

const CountryDetail = ({ countries }) => {
  return (
    <div>
      <h1>{countries.name}</h1>
      <span>{countries.capital}</span><br/>
      <span>{countries.population}</span>
      <h2>languages</h2>
      {countries.languages.map(language =>
        <li key={language.name}>{language.name}</li>
      )}
      <img src={countries.flag} alt="" width="100px" height="100px"></img>
    </div>
  )
}

const InputField = ({ label, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={onChange} />
    </div>
  )
}

const Country = ({ countries, handleShow, weather }) => {
  if (countries.length < 10 && countries.length > 1) {
    return (
      <div>
        {countries.map(country => <CountryShow key={country.name} countries={country} handleShow={handleShow} /> )}
      </div>
    )
  } else if (countries.length > 10) {
    return (
      <span>Too many.</span>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        {countries.map(country =>
          <CountryDetail key={country.name} countries={country} />
        )}
        <Weather weather={weather} />
      </div>
    )
  } else {
    return <></>
  }
};

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ query, setQuery ] = useState("");
  const [ weather, setWeather ] = useState({});

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all").then(response => {
      if (query !== "") {
        const searchResult = response.data.filter(country => 
          country.name.toLowerCase().includes(query.toLowerCase())
        );
        setCountries(searchResult);
      }
    });
  }, [query])

  useEffect(() => {
    // const KEY = process.env.API;
    // console.log(KEY)
    if (countries.length === 1) {
      const capital = countries.map(country => country.capital);
      if (capital[0]) {
        axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital[0]}&appid=ad13301f82e57a4a7d39ec135e991f8b`).then(response => {
          setWeather(response.data.main)
        })
      }
    }
  }, [countries]);
  
  console.log(weather)
  console.log(countries)

  const handleChange = (event) => {
    setQuery(event.target.value)
  };

  const handleShow = (countryName) => {
    setQuery(countryName);
  };

  return (
    <div>
      <div>
        <InputField
          label="Find countries"
          value={query}
          onChange={handleChange}
        />
      </div>
      <div>
        <Country countries={countries} handleShow={handleShow} weather={weather}  />
      </div>
    </div>
  )
}

export default App;
