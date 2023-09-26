import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch/CitySearch';

const API_KEY = '91e55b8e09544d938b7120222232509';

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  useEffect(() => {
    const initializeCities = async () => {
        const savedCities = localStorage.getItem('citiesList');
        if (savedCities) {
            const parsedCities = JSON.parse(savedCities);
            const citiesWithWeatherData = await Promise.all(parsedCities.map(async city => {
                const weatherData = localStorage.getItem(`weather_${city.name}`);
                if (weatherData) {
                    return { ...city, weatherData: JSON.parse(weatherData) };
                } else {
                    const fetchedWeatherData = await fetchWeatherData(city.name);
                    return { ...city, weatherData: fetchedWeatherData };
                }
            }));
            setCitiesList(citiesWithWeatherData);
        }
    };
    initializeCities();
}, []);


  useEffect(() => {
    localStorage.setItem('citiesList', JSON.stringify(citiesList));
  }, [citiesList]);

  const fetchWeatherData = async (cityName) => {
    const cachedWeatherData = localStorage.getItem(`weather_${cityName}`);
    if (cachedWeatherData) {
      return JSON.parse(cachedWeatherData);
    }

    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`);
    const data = await response.json();
    localStorage.setItem(`weather_${cityName}`, JSON.stringify(data));

    return data;
  };

  const handleCityAdd = async (city) => {
    if (!citiesList.some(c => c.name === city.name)) {
      const weatherData = await fetchWeatherData(city.name);
      setCitiesList(prev => [...prev, { ...city, weatherData }]);
    }
    setSuggestions([]);
  };

  const handleCityRemove = (cityName) => {
    setCitiesList(prev => prev.filter(city => city.name !== cityName));
    localStorage.removeItem(`weather_${cityName}`);
  };

  return (
    <div className="App">
      <CitySearch onCitySelect={handleCityAdd} />
      {citiesList.map(city => (
        <div key={city.id}>
          {city.name}, {city.country}
          {city.weatherData && (
            <div>
              <p>Температура: {city.weatherData.current.temp_c}°C</p>
              <img src={city.weatherData.current.condition.icon} alt={city.weatherData.current.condition.text} />
              <p>{city.weatherData.current.condition.text}</p>
              <p>Влажность: {city.weatherData.current.humidity}%</p>
              <p>Ветер: {city.weatherData.current.wind_kph} км/ч</p>
            </div>
          )}
          <button onClick={() => handleCityRemove(city.name)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}

export default App;
