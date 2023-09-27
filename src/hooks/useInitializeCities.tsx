import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/WeatherService';
import { City } from '../types/weatherTypes';

function useInitializeCities(): City[] {
    // const [citiesList, setCitiesList] = useState([]);
    const [citiesList, setCitiesList] = useState<City[]>([]);

    const fetchAndCacheCityData = async (city) => {
        const weatherData = await fetchWeatherData(city.name);
        const currentTime = new Date().getTime();
        localStorage.setItem(`weather_${city.name}`, JSON.stringify(weatherData));
        localStorage.setItem(`weatherTime_${city.name}`, currentTime.toString());
        return { ...city, weatherData };
    };

    const getCachedCityData = (city) => {
        const weatherData = localStorage.getItem(`weather_${city.name}`);
        return { ...city, weatherData: JSON.parse(weatherData) };
    };

    useEffect(() => {
        const initialize = async () => {
            const savedCities = localStorage.getItem('citiesList');
            if (savedCities) {
                const parsedCities = JSON.parse(savedCities);
                const citiesWithWeatherData = await Promise.all(parsedCities.map(async city => {
                    const weatherData = localStorage.getItem(`weather_${city.name}`);
                    const savedTime = localStorage.getItem(`weatherTime_${city.name}`);
                    const currentTime = new Date().getTime();
                    const oneHour = 60 * 60 * 1000; // Миллисекунды в одном часе

                    if (weatherData && currentTime - savedTime < oneHour) {
                        return getCachedCityData(city);
                    } else {
                        return fetchAndCacheCityData(city);
                    }
                }));

                setCitiesList(citiesWithWeatherData);
            }
        };

        initialize();
    }, []);

    return citiesList;
}

export default useInitializeCities;

