import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/WeatherService';
import { localStorageService } from '../services/localStorageService';

function useCityActions() {
  // Используем localStorageService для инициализации
  const [citiesList, setCitiesList] = useState(localStorageService.getCities());

  useEffect(() => {
    // Сохраняем в localStorage только после изменений
    localStorageService.saveCities(citiesList);
  }, [citiesList]);

  const addCity = async (city) => {
    if (!citiesList.some(c => c.name === city.name)) {
      const weatherData = await fetchWeatherData(city.name);
      setCitiesList(prev => [...prev, { ...city, weatherData }]);
    }
  };

  const removeCity = (cityName) => {
    setCitiesList(prev => prev.filter(city => city.name !== cityName));
    localStorageService.removeCityWeather(cityName);
  };

  return {
    citiesList,
    addCity,
    removeCity
  };
}

export default useCityActions;
