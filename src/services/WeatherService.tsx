import { WeatherData, Suggestion } from '../services/weatherTypes';
import { 
    WEATHER_API_BASE_URL, 
    API_KEY 
  } from './constants';

export const fetchWeatherData = async (cityName: string): Promise<WeatherData> => {
    try {
        const response = await fetch(`${WEATHER_API_BASE_URL}/current.json?key=${API_KEY}&q=${cityName}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching weather data');
        }

        const data: WeatherData = await response.json();
        return data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch weather data: ${error.message}`);
        } else {
            throw new Error('Failed to fetch weather data');
        }
    }
};

export const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
    try {
        if (!query) {
            return [];
        }

        const response = await fetch(`${WEATHER_API_BASE_URL}/search.json?key=${API_KEY}&q=${query}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching suggestions');
        }

        const suggestions: Suggestion[] = await response.json();
        return suggestions;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch suggestions: ${error.message}`);
        } else {
            throw new Error('Failed to fetch suggestions');
        }
    }
};
