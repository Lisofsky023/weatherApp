const API_KEY = '91e55b8e09544d938b7120222232509';

export const fetchWeatherData = async (cityName) => {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export const fetchSuggestions = async (query) => {
    try {
        if (!query) {
            return [];
        }
        const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        throw error;
    }
};



