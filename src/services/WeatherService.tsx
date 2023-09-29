import { WeatherData, Suggestion } from '../services/weatherTypes';

const API_KEY = '91e55b8e09544d938b7120222232509';

// Функция для получения текущих погодных данных для указанного города
export const fetchWeatherData = async (cityName: string): Promise<WeatherData> => {
    try {
        // Запрос к API для получения погодных данных
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`);
        const data: WeatherData = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

// Функция для получения списка предложений на основе запроса
export const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
    try {
        // Если запрос пустой, возвращаем пустой список
        if (!query) {
            return [];
        }
        // Запрос к API для получения предложений
        const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`);
        const suggestions: Suggestion[] = await response.json();
        return suggestions;
    } catch (error) {
        throw error;
    }
};



