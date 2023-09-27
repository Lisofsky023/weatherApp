import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/WeatherService';
import { localStorageService } from '../services/localStorageService';
import { City, WeatherData } from '../services/weatherTypes';

// function  useCityActions(initialCities: City[] = []) {
//   const [citiesList, setCitiesList] = useState<City[]>(localStorageService.getCities());

//   useEffect(() => {
//     localStorageService.saveCities(citiesList);
//   }, [citiesList]);

//   const addCity = async (city: City) => {
//     if (!citiesList.some(c => c.name === city.name)) {
//       const weatherData: WeatherData = await fetchWeatherData(city.name);
//       setCitiesList(prev => [...prev, { ...city, weatherData }]);
//     }
//   };

//   const removeCity = (cityName: string) => {
//     setCitiesList(prev => prev.filter(city => city.name !== cityName));
//     localStorageService.removeCityWeather(cityName);
//   };

//   return {
//     citiesList,
//     addCity,
//     removeCity
//   };
// }

// export default useCityActions;
function useCityActions(initialCities: City[] = []) {
  const [citiesList, setCitiesList] = useState<City[]>(() => {
    const storedCities = localStorageService.getCities();
    return storedCities.length ? storedCities : initialCities;
  });

  useEffect(() => {
    localStorageService.saveCities(citiesList);
  }, [citiesList]);

  const addCity = async (city: City) => {
    if (!citiesList.some(c => c.name === city.name)) {
      const weatherData: WeatherData = await fetchWeatherData(city.name);
      setCitiesList(prev => [...prev, { ...city, weatherData }]);
    }
  };

  const removeCity = (cityName: string) => {
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



