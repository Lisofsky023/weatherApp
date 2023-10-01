import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/WeatherService';
import { localStorageService } from '../services/localStorageService';
import { City, WeatherData } from '../services/weatherTypes';

function useCityActions(initialCities: City[] = []) {
  const [citiesList, setCitiesList] = useState<City[]>(localStorageService.getCities().length > 0 ? localStorageService.getCities() : initialCities);
  // Инициализируем список городов из локального хранилища или используем пустой массив по умолчанию
  // Сохраняем текущий список городов в локальное хранилище каждый раз при его обновлении
  useEffect(() => {
    localStorageService.saveCities(citiesList);
  }, [citiesList]);

  const addCity = async (city: City) => {
    // Проверяем, есть ли уже город в списке
    if (!citiesList.some(c => c.name === city.name)) {
      let weatherData: WeatherData;
      // Проверяем локальное хранилище на наличие данных о погоде для этого города
      const storedWeatherData = localStorageService.getCityWeather(city.name);
      if (storedWeatherData && Object.keys(storedWeatherData).length !== 0) {
        weatherData = storedWeatherData; // Используем кешированные данные
      } else {
        // Если данных в кеше нет, делаем запрос к API
        weatherData = await fetchWeatherData(city.name);
        // И сохраняем новые данные в локальное хранилище
        localStorageService.saveCityWeather(city.name, weatherData);
      }
      // Добавляем город с данными о погоде в список
      setCitiesList(prev => [...prev, { ...city, weatherData }]);
    }
  };

  // Функция для удаления города из списка
  const removeCity = (cityName: string) => {
    setCitiesList(prev => prev.filter(city => city.name !== cityName));
    // Удаляем также данные о погоде для этого города из локального хранилища
    localStorageService.removeCityWeather(cityName);
  };

  return {
    citiesList,
    addCity,
    removeCity
  };
}

export default useCityActions;

