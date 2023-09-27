import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/WeatherService';
import { City, WeatherData } from '../services/weatherTypes';

function useInitializeCities(): City[] {
    const [citiesList, setCitiesList] = useState<City[]>([]);

    const fetchAndCacheCityData = async (city: City): Promise<City> => {
        const weatherData: WeatherData = await fetchWeatherData(city.name);
        const currentTime = new Date().getTime();
        localStorage.setItem(`weather_${city.name}`, JSON.stringify(weatherData));
        localStorage.setItem(`weatherTime_${city.name}`, currentTime.toString());
        return { ...city, weatherData };
    };

    const getCachedCityData = (city: City): City => {
        const weatherItem = localStorage.getItem(`weather_${city.name}`);
        const weatherData: WeatherData | undefined = weatherItem ? JSON.parse(weatherItem) : undefined;


        return { ...city, weatherData };
    };

    useEffect(() => {
        const initialize = async () => {
            const savedCities = localStorage.getItem('citiesList');
            if (savedCities) {
                const parsedCities: City[] = JSON.parse(savedCities);
                const citiesWithWeatherData = await Promise.all(parsedCities.map(async city => {
                    const weatherData = localStorage.getItem(`weather_${city.name}`);
                    const savedTime = localStorage.getItem(`weatherTime_${city.name}`);
                    const currentTime = new Date().getTime();
                    const oneHour = 60 * 60 * 1000; // Миллисекунды в одном часе

                    if (weatherData && currentTime - Number(savedTime) < oneHour) {
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
